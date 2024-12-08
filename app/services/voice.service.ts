import { Observable } from '@nativescript/core';
import { WebRTC } from 'nativescript-webrtc';
import { Room } from '../models/room.model';
import { User } from '../models/user.model';

export class VoiceService extends Observable {
    private webRTC: WebRTC;
    private currentRoom: Room | null = null;
    private localStream: any;

    constructor() {
        super();
        this.webRTC = new WebRTC();
    }

    async joinVoiceRoom(room: Room, user: User): Promise<void> {
        try {
            this.currentRoom = room;
            this.localStream = await this.webRTC.getUserMedia({
                audio: true,
                video: false
            });

            // Initialize peer connection
            const peerConnection = this.webRTC.createPeerConnection({
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' }
                ]
            });

            // Add local stream
            this.localStream.getTracks().forEach(track => {
                peerConnection.addTrack(track, this.localStream);
            });

            this.notifyPropertyChange('isConnected', true);
        } catch (error) {
            console.error('Failed to join voice room:', error);
            throw error;
        }
    }

    leaveVoiceRoom(): void {
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }
        this.currentRoom = null;
        this.notifyPropertyChange('isConnected', false);
    }

    toggleMute(): boolean {
        if (this.localStream) {
            const audioTrack = this.localStream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            return !audioTrack.enabled;
        }
        return false;
    }

    get isConnected(): boolean {
        return !!this.currentRoom && !!this.localStream;
    }
}