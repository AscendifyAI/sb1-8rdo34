import React, { useRef, useEffect, useState } from 'react';
import { VideoCallButton } from './VideoCallButton';
import { useThemeStore } from '../lib/store';
import { getPersonaByGoalType } from '../lib/config/ai-personas';

export function AIVideoCall() {
  const theme = useThemeStore((state) => state.theme);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [isCallActive, setIsCallActive] = useState(false);

  useEffect(() => {
    if (isCallActive && localVideoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch(error => console.error('Media stream error:', error));
    }
  }, [isCallActive]);

  return (
    <div className={`
      rounded-lg overflow-hidden
      ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
    `}>
      <div className="p-4 border-b border-gray-700">
        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          AI Video Mentor
        </h3>
      </div>

      <div className="relative aspect-video bg-gray-900">
        {isCallActive && (
          <>
            <video
              ref={remoteVideoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              playsInline
            />
            <video
              ref={localVideoRef}
              className="absolute bottom-4 right-4 w-1/4 aspect-video object-cover rounded-lg"
              autoPlay
              playsInline
              muted
            />
          </>
        )}
      </div>

      <div className="p-4 flex justify-center">
        <VideoCallButton />
      </div>
    </div>
  );
}