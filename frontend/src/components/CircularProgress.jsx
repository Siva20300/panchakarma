import React, { useEffect, useState } from 'react';

const CircularProgress = ({ 
  percentage, 
  size = 80, 
  strokeWidth = 8, 
  color = 'var(--success-500)',
  backgroundColor = 'var(--gray-200)',
  animationDuration = 1500,
  showPercentage = true,
  label = ''
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  useEffect(() => {
    // Reset animation when percentage changes
    setAnimatedPercentage(0);
    
    // Start animation after a small delay
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <svg
          width={size}
          height={size}
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: `stroke-dashoffset ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
          />
        </svg>
        
        {/* Percentage text in center */}
        {showPercentage && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: size > 60 ? '1rem' : '0.875rem',
              fontWeight: 'bold',
              color: 'var(--gray-700)',
              textAlign: 'center'
            }}
          >
            <div>{Math.round(animatedPercentage)}%</div>
          </div>
        )}
      </div>
      
      {/* Optional label */}
      {label && (
        <div style={{ 
          fontSize: '0.75rem', 
          color: 'var(--gray-600)',
          textAlign: 'center',
          fontWeight: '500'
        }}>
          {label}
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
