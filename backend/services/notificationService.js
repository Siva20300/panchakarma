const Notification = require('../models/Notification');
const User = require('../models/User');
const Patient = require('../models/Patient');

class NotificationService {
  /**
   * Send booking confirmation notification to patient
   */
  static async sendBookingConfirmationToPatient(booking, patient) {
    try {
      const patientUser = await User.findById(patient.user);
      if (!patientUser) return;

      const appointmentDate = new Date(booking.appointmentDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const message = `Your ${booking.therapyType} appointment has been successfully booked for ${appointmentDate} at ${booking.appointmentTime}. 
      
Booking Details:
• Therapy Type: ${booking.therapyType}
• Date: ${appointmentDate}
• Time: ${booking.appointmentTime}
• Duration: ${booking.duration} minutes
• Meeting Mode: ${booking.meetingMode}
• Reason: ${booking.reasonForVisit}
${booking.urgencyLevel !== 'medium' ? `• Urgency: ${booking.urgencyLevel}` : ''}

Please arrive 15 minutes early for your appointment.`;

      await Notification.createNotification({
        recipient: patientUser._id,
        type: 'booking_confirmed',
        title: '✅ Appointment Booked Successfully',
        message: message,
        relatedEntities: {
          booking: booking._id,
          patient: patient._id
        },
        priority: booking.urgencyLevel === 'high' || booking.urgencyLevel === 'emergency' ? 'high' : 'medium',
        channels: [{ type: 'in-app' }],
        metadata: {
          bookingId: booking._id,
          appointmentDate: booking.appointmentDate,
          appointmentTime: booking.appointmentTime,
          therapyType: booking.therapyType
        }
      });

      console.log(`✅ Booking confirmation sent to patient: ${patientUser.name}`);
    } catch (error) {
      console.error('Error sending booking confirmation to patient:', error);
    }
  }

  /**
   * Send new booking notification to doctor with patient details
   */
  static async sendNewBookingNotificationToDoctor(booking, patient, doctor) {
    try {
      if (!doctor) return;

      const patientUser = await User.findById(patient.user);
      if (!patientUser) return;

      const appointmentDate = new Date(booking.appointmentDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const message = `New appointment booking requires your attention.

Patient Information:
• Name: ${patientUser.name}
• Age: ${patientUser.age || 'Not specified'}
• Phone: ${patientUser.phone || 'Not provided'}
• Email: ${patientUser.email}
• Patient ID: ${patient.patientId}

Appointment Details:
• Therapy Type: ${booking.therapyType}
• Date: ${appointmentDate}
• Time: ${booking.appointmentTime}
• Duration: ${booking.duration} minutes
• Meeting Mode: ${booking.meetingMode}
• Urgency Level: ${booking.urgencyLevel}

Medical Information:
• Primary Problem: ${patient.primaryProblem}
• Problems: ${patient.problems.join(', ')}
• Reason for Visit: ${booking.reasonForVisit}
${booking.symptoms ? `• Symptoms: ${booking.symptoms.join(', ')}` : ''}
${booking.preferences ? `• Special Preferences: ${booking.preferences}` : ''}

Please review and confirm this appointment.`;

      await Notification.createNotification({
        recipient: doctor._id,
        type: 'new_booking',
        title: '🩺 New Patient Booking',
        message: message,
        relatedEntities: {
          booking: booking._id,
          patient: patient._id,
          patientUser: patientUser._id
        },
        priority: booking.urgencyLevel === 'emergency' ? 'urgent' : 
                 booking.urgencyLevel === 'high' ? 'high' : 'medium',
        channels: [{ type: 'in-app' }],
        metadata: {
          bookingId: booking._id,
          patientId: patient._id,
          patientName: patientUser.name,
          appointmentDate: booking.appointmentDate,
          appointmentTime: booking.appointmentTime,
          therapyType: booking.therapyType,
          urgencyLevel: booking.urgencyLevel
        }
      });

      console.log(`🩺 New booking notification sent to doctor: ${doctor.name}`);
    } catch (error) {
      console.error('Error sending new booking notification to doctor:', error);
    }
  }

  /**
   * Send new booking notification to therapist with patient details
   */
  static async sendNewBookingNotificationToTherapist(booking, patient, therapist) {
    try {
      if (!therapist) return;

      const patientUser = await User.findById(patient.user);
      if (!patientUser) return;

      const appointmentDate = new Date(booking.appointmentDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const message = `You have been assigned a new therapy session.

Patient Information:
• Name: ${patientUser.name}
• Age: ${patientUser.age || 'Not specified'}
• Phone: ${patientUser.phone || 'Not provided'}
• Email: ${patientUser.email}
• Patient ID: ${patient.patientId}

Session Details:
• Therapy Type: ${booking.therapyType}
• Date: ${appointmentDate}
• Time: ${booking.appointmentTime}
• Duration: ${booking.duration} minutes
• Meeting Mode: ${booking.meetingMode}
• Urgency Level: ${booking.urgencyLevel}

Patient Background:
• Primary Problem: ${patient.primaryProblem}
• Problems: ${patient.problems.join(', ')}
• Reason for Visit: ${booking.reasonForVisit}
${booking.symptoms ? `• Current Symptoms: ${booking.symptoms.join(', ')}` : ''}
${booking.preferences ? `• Patient Preferences: ${booking.preferences}` : ''}

Please prepare for this session and review the patient's history.`;

      await Notification.createNotification({
        recipient: therapist._id,
        type: 'new_booking',
        title: '🧘‍♀️ New Therapy Session Assigned',
        message: message,
        relatedEntities: {
          booking: booking._id,
          patient: patient._id,
          patientUser: patientUser._id
        },
        priority: booking.urgencyLevel === 'emergency' ? 'urgent' : 
                 booking.urgencyLevel === 'high' ? 'high' : 'medium',
        channels: [{ type: 'in-app' }],
        metadata: {
          bookingId: booking._id,
          patientId: patient._id,
          patientName: patientUser.name,
          appointmentDate: booking.appointmentDate,
          appointmentTime: booking.appointmentTime,
          therapyType: booking.therapyType,
          urgencyLevel: booking.urgencyLevel
        }
      });

      console.log(`🧘‍♀️ New booking notification sent to therapist: ${therapist.name}`);
    } catch (error) {
      console.error('Error sending new booking notification to therapist:', error);
    }
  }

  /**
   * Send booking cancellation notifications
   */
  static async sendBookingCancellationNotifications(booking, cancelledBy) {
    try {
      const patient = await Patient.findById(booking.patient).populate('user');
      const therapist = booking.therapist ? await User.findById(booking.therapist) : null;
      const doctor = booking.doctor ? await User.findById(booking.doctor) : null;

      const appointmentDate = new Date(booking.appointmentDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const baseMessage = `Appointment cancelled for ${booking.therapyType} on ${appointmentDate} at ${booking.appointmentTime}.`;
      const reason = booking.cancellationReason ? `\n\nReason: ${booking.cancellationReason}` : '';

      // Notify patient if cancelled by someone else
      if (patient && cancelledBy.toString() !== patient.user._id.toString()) {
        await Notification.createNotification({
          recipient: patient.user._id,
          type: 'booking_cancelled',
          title: '❌ Appointment Cancelled',
          message: `${baseMessage}${reason}\n\nPlease contact us to reschedule if needed.`,
          relatedEntities: { booking: booking._id },
          priority: 'high',
          channels: [{ type: 'in-app' }]
        });
      }

      // Notify therapist if cancelled by someone else
      if (therapist && cancelledBy.toString() !== therapist._id.toString()) {
        await Notification.createNotification({
          recipient: therapist._id,
          type: 'booking_cancelled',
          title: '❌ Session Cancelled',
          message: `${baseMessage} with ${patient.user.name}${reason}`,
          relatedEntities: { booking: booking._id },
          priority: 'medium',
          channels: [{ type: 'in-app' }]
        });
      }

      // Notify doctor if cancelled by someone else
      if (doctor && cancelledBy.toString() !== doctor._id.toString()) {
        await Notification.createNotification({
          recipient: doctor._id,
          type: 'booking_cancelled',
          title: '❌ Appointment Cancelled',
          message: `${baseMessage} for patient ${patient.user.name}${reason}`,
          relatedEntities: { booking: booking._id },
          priority: 'medium',
          channels: [{ type: 'in-app' }]
        });
      }

      console.log('📤 Booking cancellation notifications sent');
    } catch (error) {
      console.error('Error sending booking cancellation notifications:', error);
    }
  }

  /**
   * Send appointment reminder notifications
   */
  static async sendAppointmentReminders(booking) {
    try {
      const patient = await Patient.findById(booking.patient).populate('user');
      const therapist = booking.therapist ? await User.findById(booking.therapist) : null;

      const appointmentDate = new Date(booking.appointmentDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Reminder to patient
      if (patient) {
        await Notification.createNotification({
          recipient: patient.user._id,
          type: 'appointment_reminder',
          title: '⏰ Appointment Reminder',
          message: `Reminder: You have a ${booking.therapyType} appointment tomorrow at ${booking.appointmentTime}.\n\nPlease arrive 15 minutes early.`,
          relatedEntities: { booking: booking._id },
          priority: 'medium',
          channels: [{ type: 'in-app' }]
        });
      }

      // Reminder to therapist
      if (therapist) {
        await Notification.createNotification({
          recipient: therapist._id,
          type: 'appointment_reminder',
          title: '⏰ Session Reminder',
          message: `Reminder: You have a ${booking.therapyType} session with ${patient.user.name} tomorrow at ${booking.appointmentTime}.`,
          relatedEntities: { booking: booking._id },
          priority: 'medium',
          channels: [{ type: 'in-app' }]
        });
      }

      console.log('⏰ Appointment reminders sent');
    } catch (error) {
      console.error('Error sending appointment reminders:', error);
    }
  }
}

module.exports = NotificationService;
