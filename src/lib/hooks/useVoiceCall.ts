import { useState, useCallback } from 'react';
import { AgoraService } from '../services/voice/AgoraService';

export function useVoiceCall() {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const agoraService = new AgoraService(import.meta.env.VITE_AGORA_APP_ID);

  const startCall = useCallback(async (channelName: string, uid: string) => {
    try {
      await agoraService.joinChannel(channelName, uid);
      setIsConnected(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to start call'));
      throw err;
    }
  }, []);

  const endCall = useCallback(async () => {
    try {
      await agoraService.leaveChannel();
      setIsConnected(false);
      setIsMuted(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to end call'));
      throw err;
    }
  }, []);

  const toggleMute = useCallback(async () => {
    try {
      if (isMuted) {
        await agoraService.unmuteAudio();
      } else {
        await agoraService.muteAudio();
      }
      setIsMuted(!isMuted);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to toggle mute'));
      throw err;
    }
  }, [isMuted]);

  return {
    isConnected,
    isMuted,
    error,
    startCall,
    endCall,
    toggleMute,
  };
}