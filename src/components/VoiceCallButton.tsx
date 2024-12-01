import React, { useState } from 'react';
import { Phone, PhoneOff, Mic, MicOff } from 'lucide-react';
import { useAIInteraction } from '../lib/hooks/useAIInteraction';
import { useAuthStore } from '../lib/store';

export function VoiceCallButton() {
  const user = useAuthStore((state) => state.user);
  const { processVoice, isLoading, error } = useAIInteraction();
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startCall = async () => {
    if (!user) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      recorder.ondataavailable = async (event) => {
        audioChunks.push(event.data);
        if (recorder.state === 'inactive') {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          await processVoice({
            audioData: audioBlob,
            userId: user.id,
            context: {
              timestamp: new Date(),
              userGoals: user.goals,
            }
          });
        }
      };

      recorder.start(1000); // Capture audio in 1-second intervals
      setMediaRecorder(recorder);
      setIsActive(true);
    } catch (error) {
      console.error('Failed to start voice call:', error);
    }
  };

  const endCall = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setMediaRecorder(null);
    }
    setIsActive(false);
    setIsMuted(false);
  };

  const toggleMute = () => {
    if (mediaRecorder) {
      mediaRecorder.stream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
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
            <PhoneOff className="w-4 h-4" />
            End Call
          </>
        ) : (
          <>
            <Phone className="w-4 h-4" />
            Start Call
          </>
        )}
      </button>

      {isActive && (
        <button
          onClick={toggleMute}
          className={`
            p-2 rounded-lg transition-colors
            ${isMuted
              ? 'bg-gray-500 hover:bg-gray-600'
              : 'bg-amber-500 hover:bg-amber-600'}
            text-white
          `}
        >
          {isMuted ? (
            <MicOff className="w-4 h-4" />
          ) : (
            <Mic className="w-4 h-4" />
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