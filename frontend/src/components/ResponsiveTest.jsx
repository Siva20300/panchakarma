import React, { useState, useEffect } from 'react';

const ResponsiveTest = () => {
  const [screenInfo, setScreenInfo] = useState({
    width: 0,
    height: 0,
    device: 'Unknown'
  });

  useEffect(() => {
    const updateScreenInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      let device = 'Desktop';
      
      if (width <= 767) {
        device = 'Mobile';
      } else if (width <= 1024) {
        device = 'Tablet';
      }
      
      setScreenInfo({ width, height, device });
    };

    updateScreenInfo();
    window.addEventListener('resize', updateScreenInfo);
    
    return () => window.removeEventListener('resize', updateScreenInfo);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      <div>📱 {screenInfo.device}</div>
      <div>{screenInfo.width} x {screenInfo.height}</div>
      <div style={{ 
        color: screenInfo.width <= 767 ? '#4ade80' : 
              screenInfo.width <= 1024 ? '#f59e0b' : '#3b82f6' 
      }}>
        {screenInfo.width <= 767 ? 'MOBILE VIEW' : 
         screenInfo.width <= 1024 ? 'TABLET VIEW' : 'DESKTOP VIEW'}
      </div>
    </div>
  );
};

export default ResponsiveTest;
