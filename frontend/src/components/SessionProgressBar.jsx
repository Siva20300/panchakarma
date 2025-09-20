import React, { useEffect, useId } from 'react';

/**
 * Segmented session progress bar with pop animation per session.
 * - Renders N segments (total sessions)
 * - First `completed` segments pop-animate as filled
 * - Current session (completed) can be highlighted with pulse border
 */
const SessionProgressBar = ({
  total,
  completed,
  height = 12,
  gap = 6,
  filledColor = 'var(--success-500)',
  emptyColor = 'var(--gray-200)',
  currentBorder = '2px solid var(--primary-400)',
  animate = true,
  perSegmentDurationMs = 220,
  staggerMs = 90,
}) => {
  const key = useId().replace(/:/g, '');
  const keyframeName = `popIn_${key}`;

  useEffect(() => {
    // Inject keyframes for pop animation once
    const style = document.createElement('style');
    style.dataset.sessionBar = key;
    style.innerHTML = `@keyframes ${keyframeName} { 0% { transform: scaleY(0.2); opacity: 0.2; } 60% { transform: scaleY(1.08); opacity: 1; } 100% { transform: scaleY(1); opacity: 1; } }`;
    document.head.appendChild(style);
    return () => {
      if (style && style.parentNode) style.parentNode.removeChild(style);
    };
  }, [key, keyframeName]);

  const segments = Array.from({ length: total }, (_, i) => i);
  const clampedCompleted = Math.max(0, Math.min(completed, total));

  return (
    <div>
      <div style={{ display: 'flex', gap: `${gap}px`, alignItems: 'center' }}>
        {segments.map((i) => {
          const isFilled = i < clampedCompleted;
          const isCurrent = i === clampedCompleted && clampedCompleted < total;
          const animDelay = `${i * staggerMs}ms`;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height,
                background: emptyColor,
                borderRadius: 999,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isCurrent ? 'inset 0 0 0 1px var(--primary-200)' : 'none',
              }}
              title={`Session ${i + 1} of ${total}${isFilled ? ' (done)' : isCurrent ? ' (current)' : ''}`}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: isFilled ? '100%' : '0%',
                  background: filledColor,
                  borderRadius: 999,
                  transformOrigin: 'center',
                  animation: animate && isFilled ? `${keyframeName} ${perSegmentDurationMs}ms cubic-bezier(0.2, 0.8, 0.2, 1) both` : 'none',
                  animationDelay: animate && isFilled ? animDelay : '0ms',
                }}
              />
              {isCurrent && (
                <div style={{
                  position: 'absolute', inset: 0, border: currentBorder, borderRadius: 999, boxShadow: '0 0 0 2px rgba(59,130,246,0.12)'
                }} />
              )}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', color: 'var(--gray-600)', fontSize: 12 }}>
        <span>Sessions Schedule</span>
        <span>{clampedCompleted}/{total} completed</span>
      </div>
    </div>
  );
};

export default SessionProgressBar;
