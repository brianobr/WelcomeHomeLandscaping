import { useState, useEffect } from 'react';

export interface ConnectionSpeed {
  type: 'high' | 'medium' | 'low' | 'unknown';
  effectiveType: string;
  downlink: number;
  rtt: number;
}

export function useConnectionSpeed(): ConnectionSpeed {
  const [connectionSpeed, setConnectionSpeed] = useState<ConnectionSpeed>({
    type: 'unknown',
    effectiveType: 'unknown',
    downlink: 0,
    rtt: 0
  });

  useEffect(() => {
    // Check if Network Information API is available
    const navigator = window.navigator as any;
    
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      
      const updateConnectionInfo = () => {
        const effectiveType = connection.effectiveType || 'unknown';
        const downlink = connection.downlink || 0;
        const rtt = connection.rtt || 0;
        
        // Categorize connection speed
        let type: 'high' | 'medium' | 'low' | 'unknown' = 'unknown';
        
        if (effectiveType === '4g' && downlink > 1.5) {
          type = 'high';
        } else if (effectiveType === '4g' || (effectiveType === '3g' && downlink > 0.7)) {
          type = 'medium';
        } else if (effectiveType === '3g' || effectiveType === '2g' || downlink <= 0.7) {
          type = 'low';
        } else if (downlink > 2) {
          type = 'high';
        } else if (downlink > 1) {
          type = 'medium';
        } else {
          type = 'low';
        }
        
        setConnectionSpeed({
          type,
          effectiveType,
          downlink,
          rtt
        });
      };
      
      // Initial check
      updateConnectionInfo();
      
      // Listen for changes
      connection.addEventListener('change', updateConnectionInfo);
      
      return () => {
        connection.removeEventListener('change', updateConnectionInfo);
      };
    } else {
      // Fallback: Use a simple download test
      const performSpeedTest = async () => {
        try {
          const startTime = performance.now();
          
          // Download a small test file (you can replace this with your own test image)
          const response = await fetch('/test-image.jpg?' + Math.random(), {
            cache: 'no-cache'
          });
          
          if (response.ok) {
            const blob = await response.blob();
            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000; // Convert to seconds
            const sizeMB = blob.size / (1024 * 1024);
            const speedMbps = (sizeMB * 8) / duration; // Convert to Mbps
            
            let type: 'high' | 'medium' | 'low' = 'medium';
            
            if (speedMbps > 5) {
              type = 'high';
            } else if (speedMbps > 1.5) {
              type = 'medium';
            } else {
              type = 'low';
            }
            
            setConnectionSpeed({
              type,
              effectiveType: `${speedMbps.toFixed(1)}mbps`,
              downlink: speedMbps,
              rtt: 0
            });
          }
        } catch (error) {
          console.warn('Speed test failed, defaulting to medium quality');
          setConnectionSpeed({
            type: 'medium',
            effectiveType: 'fallback',
            downlink: 1,
            rtt: 0
          });
        }
      };
      
      performSpeedTest();
    }
  }, []);

  return connectionSpeed;
}