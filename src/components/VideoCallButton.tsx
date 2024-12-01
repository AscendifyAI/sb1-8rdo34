import React, { useState } from 'react';
import { Video, VideoOff, Camera, CameraOff } from 'lucide-react';
import { useAIInteraction } from '../lib/hooks/useAIInteraction';
import { useAuthStore } from '../lib/store';
import type { VideoPreferences } from '../lib/types';

export function VideoCallButton() {
  const user = useAuthStore((state) => state.user);
  const { processVideo, isLoading, error } = useAIInteraction();
  const [isActive, setIsActive] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  const startCall = async () => {
    if (!user) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: true 
      });

      const preferences: VideoPreferences = {
        quality: 'high',
        background: 'office',
        avatarStyle: 'professional'
      };

      await processVideo({
        sessionId: `session-${Date.now()}`,
        userId: user.id,
        preferences,
        context: {
          userGoals: user.goals,
          timestamp: new Date()
        }
      });

      setVideoStream(stream);
      setIsActive(true);
    } catch (error) {
      console.error('Failed to start video call:', error);
    }
  };

  const endCall = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    }
    setIsActive(false);
    setIsCameraOff(false);
  };

  const toggleCamera = () => {
    if (videoStream) {
      videoStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraOff(!isCameraOff);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={isActive ? endCall : startCall}
        disabled={isLoading}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
          ${isActive
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-amber-500 hover:bg-amber-600 text-black'}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isActive ? (
          <>
            <VideoOff className="w-4 h-4" />
            End Call
          </>
        ) : (
          <>
            <Video className="w-4 h-4" />
            Start Call
          </>
        )}
      </button>

      {isActive && (
        <button
          onClick={toggleCamera}
          className={`
            p-2 rounded-lg transition-colors
            ${isCameraOff
              ? 'bg-gray-500 hover:bg-gray-600'
              : 'bg-amber-500 hover:bg-amber-600'}
            text-white
          `}
        >
          {isCameraOff ? (
            <CameraOff className="w-4 h-4" />
          ) : (
            <Camera className="w-4 h-4" />
          )}
        </button>
      )}

      {error && (
        <span className="text-red-500 text-sm">
          {error.message}
        </span>
      )}
    </div>
  );
}