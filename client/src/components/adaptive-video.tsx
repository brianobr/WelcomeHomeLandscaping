import React, { useState, useRef, useEffect } from 'react';
import { useConnectionSpeed } from '@/hooks/use-connection-speed';

interface VideoSource {
  src: string;
  quality: 'high' | 'medium' | 'low';
  resolution: string;
  size?: string;
}

interface AdaptiveVideoProps {
  sources: VideoSource[];
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
  onError?: (error: Event) => void;
}

export function AdaptiveVideo({
  sources,
  poster,
  className = '',
  style,
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
  onLoadStart,
  onCanPlay,
  onError
}: AdaptiveVideoProps) {
  const connectionSpeed = useConnectionSpeed();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSource, setCurrentSource] = useState<VideoSource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);

  // Initialize with first available source immediately
  useEffect(() => {
    if (sources.length > 0 && !currentSource) {
      console.log('AdaptiveVideo: Setting initial source:', sources[0].src);
      setCurrentSource(sources[0]);
    }
  }, [sources]);

  // Select the best video source based on connection speed
  useEffect(() => {
    console.log('AdaptiveVideo: Sources available:', sources.length);
    console.log('AdaptiveVideo: Connection speed:', connectionSpeed);
    
    if (sources.length === 0) {
      console.log('AdaptiveVideo: No sources available');
      return;
    }

    let selectedSource: VideoSource;

    // Find the best quality based on connection speed
    switch (connectionSpeed.type) {
      case 'high':
        selectedSource = sources.find(s => s.quality === 'high') || sources[0];
        break;
      case 'medium':
        selectedSource = sources.find(s => s.quality === 'medium') || sources[0];
        break;
      case 'low':
        selectedSource = sources.find(s => s.quality === 'low') || sources[sources.length - 1];
        break;
      default:
        // Default to medium quality if connection speed is unknown, fallback to first source
        selectedSource = sources.find(s => s.quality === 'medium') || sources.find(s => s.quality === 'high') || sources[0];
    }

    console.log('AdaptiveVideo: Selected source:', selectedSource);

    // Always set source if we don't have one, or if it changed
    if (!currentSource || currentSource.src !== selectedSource.src) {
      console.log('AdaptiveVideo: Setting new source:', selectedSource.src);
      setCurrentSource(selectedSource);
      setHasError(false);
      setLoadAttempts(0);
    }
  }, [connectionSpeed.type, sources]); // Removed currentSource from dependencies to avoid loops

  // Handle video loading
  const handleLoadStart = () => {
    setIsLoading(true);
    onLoadStart?.();
  };

  const handleCanPlay = () => {
    console.log('Video ready to play');
    setIsLoading(false);
    onCanPlay?.();
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.warn(`Failed to load video: ${currentSource?.src}`);
    setHasError(true);
    setLoadAttempts(prev => prev + 1);
    
    // Try to fallback to a lower quality if available
    if (currentSource && loadAttempts < 2) {
      const currentIndex = sources.findIndex(s => s.src === currentSource.src);
      const fallbackSource = sources[currentIndex + 1];
      
      if (fallbackSource) {
        console.log(`Falling back to ${fallbackSource.quality} quality`);
        setCurrentSource(fallbackSource);
        setHasError(false);
        return;
      }
    }
    
    onError?.(e.nativeEvent);
  };

  // Preload optimization and autoplay handling
  useEffect(() => {
    if (currentSource && videoRef.current) {
      // Preload metadata for faster startup
      videoRef.current.preload = 'metadata';
      
      // Try to play the video after it's ready
      if (autoPlay) {
        const playVideo = async () => {
          try {
            await videoRef.current?.play();
            console.log('Video started playing successfully');
          } catch (error) {
            console.warn('Autoplay failed:', error);
          }
        };
        
        // Add event listener for when video can play
        const handleCanPlayThrough = () => {
          playVideo();
        };
        
        videoRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
        
        return () => {
          videoRef.current?.removeEventListener('canplaythrough', handleCanPlayThrough);
        };
      }
    }
  }, [currentSource, autoPlay]);

  if (!currentSource) {
    console.log('AdaptiveVideo: No current source, showing loading state');
    console.log('AdaptiveVideo: Sources length:', sources.length);
    console.log('AdaptiveVideo: Available sources:', sources);
    return (
      <div className={`bg-gray-200 animate-pulse ${className}`} style={style}>
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-500">Loading video...</span>
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs p-2 rounded z-50">
            DEBUG: No currentSource - Sources: {sources.length}
          </div>
        </div>
      </div>
    );
  }

  console.log('AdaptiveVideo: Rendering video with source:', currentSource.src);

  return (
    <div className="relative" style={style}>
      <video
        ref={videoRef}
        className={className}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={false}
        preload="metadata"
        style={{ 
          objectFit: 'cover', 
          width: '100%', 
          height: '100%',
          backgroundColor: 'red', // Temporary debug: shows if video element exists
          opacity: 1,
          zIndex: 1
        }}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onError={handleError}
        onLoadedData={() => console.log('Video data loaded')}
        onPlay={() => console.log('Video playing')}
        onPause={() => console.log('Video paused')}
        key={currentSource.src} // Force re-render when source changes
      >
        <source src={currentSource.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Loading indicator - temporarily disabled for debugging */}
      {false && isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-700">
                Loading {currentSource.quality} quality video...
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Error fallback */}
      {hasError && loadAttempts >= 2 && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <p className="mb-2">Unable to load video</p>
            <button 
              onClick={() => {
                setHasError(false);
                setLoadAttempts(0);
                videoRef.current?.load();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      {/* Development info with video debugging */}
      {process.env.NODE_ENV === 'development' && currentSource && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs p-2 rounded z-50">
          <div>Quality: {currentSource.quality}</div>
          <div>Connection: {connectionSpeed.type}</div>
          <div>Speed: {connectionSpeed.downlink.toFixed(1)} Mbps</div>
          <div>Source: {currentSource.src}</div>
          <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
          <div>Error: {hasError ? 'Yes' : 'No'}</div>
        </div>
      )}
    </div>
  );
}