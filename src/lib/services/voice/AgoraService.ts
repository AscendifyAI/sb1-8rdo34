import AgoraRTC, { 
  IAgoraRTCClient, 
  IAgoraRTCRemoteUser, 
  ILocalAudioTrack 
} from 'agora-rtc-sdk-ng';

export class AgoraService {
  private client: IAgoraRTCClient;
  private localAudioTrack: ILocalAudioTrack | null = null;
  private appId: string;

  constructor(appId: string) {
    this.appId = appId;
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  }

  async joinChannel(channelName: string, uid: string): Promise<void> {
    try {
      // Join the channel
      await this.client.join(this.appId, channelName, null, uid);
      
      // Create and publish local audio track
      this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      await this.client.publish([this.localAudioTrack]);

      // Handle remote user events
      this.client.on('user-published', this.handleUserPublished);
      this.client.on('user-unpublished', this.handleUserUnpublished);
    } catch (error) {
      console.error('Error joining channel:', error);
      throw error;
    }
  }

  async leaveChannel(): Promise<void> {
    try {
      // Stop and close local audio track
      if (this.localAudioTrack) {
        this.localAudioTrack.stop();
        this.localAudioTrack.close();
      }

      // Leave the channel
      await this.client.leave();
    } catch (error) {
      console.error('Error leaving channel:', error);
      throw error;
    }
  }

  private handleUserPublished = async (
    user: IAgoraRTCRemoteUser,
    mediaType: 'audio' | 'video'
  ): Promise<void> => {
    if (mediaType === 'audio') {
      // Subscribe to remote user's audio track
      await this.client.subscribe(user, mediaType);
      user.audioTrack?.play();
    }
  };

  private handleUserUnpublished = (
    user: IAgoraRTCRemoteUser
  ): void => {
    // Handle remote user leaving
  };

  async muteAudio(): Promise<void> {
    if (this.localAudioTrack) {
      await this.localAudioTrack.setEnabled(false);
    }
  }

  async unmuteAudio(): Promise<void> {
    if (this.localAudioTrack) {
      await this.localAudioTrack.setEnabled(true);
    }
  }
}