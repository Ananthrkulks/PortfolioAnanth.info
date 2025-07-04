import React, { forwardRef, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
  poster?: string;
  onPlay?: () => void;
  onPause?: () => void;
  controls?: boolean;
  playsInline?: boolean;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(({ 
  src, 
  className, 
  poster, 
  onPlay, 
  onPause,
  controls = false,
  playsInline = true 
}, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlay = () => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.play()
        .then(() => {
          setIsPlaying(true);
          setError(null);
          onPlay?.();
        })
        .catch((err) => {
          console.error('Error playing video:', err);
          setError('Failed to play video');
        });
    }
  };

  const handlePause = () => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.pause();
      setIsPlaying(false);
      onPause?.();
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = e.target as HTMLVideoElement;
    const error = videoElement.error;
    let errorMessage = 'Error loading video';
    
    if (error) {
      switch (error.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          errorMessage = 'Video playback was aborted';
          break;
        case MediaError.MEDIA_ERR_NETWORK:
          errorMessage = 'Network error while loading video';
          break;
        case MediaError.MEDIA_ERR_DECODE:
          errorMessage = 'Video decoding failed';
          break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMessage = 'Video format not supported';
          break;
      }
    }
    
    console.error('Video error:', errorMessage);
    setError(errorMessage);
  };

  return (
    <div className={`relative ${className}`}>
      <video
        ref={ref}
        className="w-full h-full object-cover"
        poster={poster}
        onError={handleError}
        playsInline={playsInline}
        controls={controls}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white p-4 text-center">
          <p>{error}</p>
        </div>
      )}
      
      {!isPlaying && !error && !controls && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-opacity"
        >
          <svg
            className="w-16 h-16 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
      
      {isPlaying && !error && !controls && (
        <button
          onClick={handlePause}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-opacity"
        >
          <svg
            className="w-16 h-16 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        </button>
      )}
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer; 