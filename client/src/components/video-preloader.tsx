import React, { useEffect, useRef } from 'react';
import { useConnectionSpeed } from '@/hooks/use-connection-speed';

interface VideoPreloaderProps {
  sources: Array<{
    src: string;
    quality: 'high' | 'medium' | 'low';
  }>;
  priority?: 'high' | 'low';
  preloadAmount?: 'metadata' | 'auto' | 'none';
}

/**
 * VideoPreloader component for intelligently preloading videos
 * based on connection speed and priority
 */
export function VideoPreloader({ 
  sources, 
  priority = 'low',
  preloadAmount = 'metadata' 
}: VideoPreloaderProps) {
  const connectionSpeed = useConnectionSpeed();
  const preloadedVideos = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Only preload if we have a good connection or high priority content
    const shouldPreload = 
      priority === 'high' || 
      connectionSpeed.type === 'high' ||
      (connectionSpeed.type === 'medium' && preloadAmount === 'metadata');

    if (!shouldPreload) return;

    // Select appropriate quality for preloading
    let targetQuality: 'high' | 'medium' | 'low';
    
    switch (connectionSpeed.type) {
      case 'high':
        targetQuality = priority === 'high' ? 'high' : 'medium';
        break;
      case 'medium':
        targetQuality = 'medium';
        break;
      case 'low':
      default:
        targetQuality = 'low';
        break;
    }

    const targetSource = sources.find(s => s.quality === targetQuality);
    if (!targetSource || preloadedVideos.current.has(targetSource.src)) {
      return;
    }

    // Create invisible video element for preloading
    const video = document.createElement('video');
    video.preload = preloadAmount;
    video.muted = true;
    video.style.display = 'none';
    video.src = targetSource.src;

    // Add loading event listeners
    const handleLoadStart = () => {
      console.log(`Preloading ${targetQuality} video:`, targetSource.src);
    };

    const handleCanPlay = () => {
      console.log(`Preloaded ${targetQuality} video ready:`, targetSource.src);
      preloadedVideos.current.add(targetSource.src);
    };

    const handleError = () => {
      console.warn(`Failed to preload ${targetQuality} video:`, targetSource.src);
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Add to DOM to start preloading
    document.body.appendChild(video);

    // Cleanup function
    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      
      if (video.parentNode) {
        video.parentNode.removeChild(video);
      }
    };
  }, [sources, connectionSpeed.type, priority, preloadAmount]);

  // This component doesn't render anything visible
  return null;
}