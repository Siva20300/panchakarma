const cron = require('node-cron');
const Booking = require('../models/Booking');
const NotificationService = require('./notificationService');

class ScheduledTasks {
  /**
   * Initialize all scheduled tasks
   */
  static init() {
    console.log('🕐 Initializing scheduled tasks...');
    
    // Send appointment reminders daily at 9 AM
    this.scheduleAppointmentReminders();
    
    // Clean up old notifications weekly
    this.scheduleNotificationCleanup();
    
    console.log('✅ Scheduled tasks initialized');
  }

  /**
   * Schedule appointment reminders to be sent daily at 9 AM
   */
  static scheduleAppointmentReminders() {
    // Run every day at 9:00 AM
    cron.schedule('0 9 * * *', async () => {
      console.log('⏰ Running appointment reminder task...');
      
      try {
        // Get appointments for tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const dayAfterTomorrow = new Date(tomorrow);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

        const upcomingBookings = await Booking.find({
          appointmentDate: {
            $gte: tomorrow,
            $lt: dayAfterTomorrow
          },
          status: { $in: ['confirmed', 'pending'] }
        }).populate('patient').populate('therapist');

        console.log(`📋 Found ${upcomingBookings.length} appointments for tomorrow`);

        // Send reminders for each booking
        for (const booking of upcomingBookings) {
          try {
            await NotificationService.sendAppointmentReminders(booking);
          } catch (error) {
            console.error(`Error sending reminder for booking ${booking._id}:`, error);
          }
        }

        console.log('✅ Appointment reminders sent successfully');
      } catch (error) {
        console.error('❌ Error in appointment reminder task:', error);
      }
    });

    console.log('📅 Appointment reminder task scheduled for 9:00 AM daily');
  }

  /**
   * Schedule notification cleanup to run weekly
   */
  static scheduleNotificationCleanup() {
    // Run every Sunday at 2:00 AM
    cron.schedule('0 2 * * 0', async () => {
      console.log('🧹 Running notification cleanup task...');
      
      try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // Delete old read notifications
        const result = await require('../models/Notification').deleteMany({
          createdAt: { $lt: thirtyDaysAgo },
          isRead: true
        });

        console.log(`🗑️ Cleaned up ${result.deletedCount} old notifications`);
      } catch (error) {
        console.error('❌ Error in notification cleanup task:', error);
      }
    });

    console.log('🧹 Notification cleanup task scheduled for 2:00 AM every Sunday');
  }

  /**
   * Send immediate reminder for urgent appointments (can be called manually)
   */
  static async sendUrgentReminders() {
    try {
      console.log('🚨 Sending urgent appointment reminders...');
      
      const now = new Date();
      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

      const urgentBookings = await Booking.find({
        appointmentDate: {
          $gte: now,
          $lte: oneHourFromNow
        },
        status: { $in: ['confirmed', 'pending'] },
        urgencyLevel: { $in: ['high', 'emergency'] }
      }).populate('patient').populate('therapist');

      for (const booking of urgentBookings) {
        await NotificationService.sendAppointmentReminders(booking);
      }

      console.log(`🚨 Sent urgent reminders for ${urgentBookings.length} appointments`);
      return urgentBookings.length;
    } catch (error) {
      console.error('❌ Error sending urgent reminders:', error);
      return 0;
    }
  }

  /**
   * Get statistics about upcoming appointments
   */
  static async getUpcomingAppointmentStats() {
    try {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const dayAfterTomorrow = new Date(tomorrow);
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

      const stats = await Booking.aggregate([
        {
          $match: {
            appointmentDate: {
              $gte: tomorrow,
              $lt: dayAfterTomorrow
            },
            status: { $in: ['confirmed', 'pending'] }
          }
        },
        {
          $group: {
            _id: '$urgencyLevel',
            count: { $sum: 1 }
          }
        }
      ]);

      const totalTomorrow = await Booking.countDocuments({
        appointmentDate: {
          $gte: tomorrow,
          $lt: dayAfterTomorrow
        },
        status: { $in: ['confirmed', 'pending'] }
      });

      return {
        totalTomorrow,
        byUrgency: stats
      };
    } catch (error) {
      console.error('Error getting appointment stats:', error);
      return null;
    }
  }
}

module.exports = ScheduledTasks;
