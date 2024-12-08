import { Observable, Frame } from '@nativescript/core';
import { RoomService } from '../../services/room.service';
import { AuthService } from '../../services/auth.service';
import { VoiceService } from '../../services/voice.service';
import { Room } from '../../models/room.model';
import { User } from '../../models/user.model';

export class RoomViewModel extends Observable {
    private roomService: RoomService;
    private authService: AuthService;
    private voiceService: VoiceService;
    private _room: Room;
    private _participants: User[] = [];
    private _isMuted: boolean = false;

    constructor(roomId: string) {
        super();
        this.roomService = new RoomService();
        this.authService = new AuthService();
        this.voiceService = new VoiceService();
        
        this._room = this.roomService.getRoomById(roomId);
        this.joinVoiceRoom();
    }

    get room(): Room {
        return this._room;
    }

    get participants(): User[] {
        return this._participants;
    }

    get isMuted(): boolean {
        return this._isMuted;
    }

    async joinVoiceRoom() {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser && this._room) {
            try {
                await this.voiceService.joinVoiceRoom(this._room, currentUser);
                this.refreshParticipants();
            } catch (error) {
                console.error('Failed to join voice room:', error);
            }
        }
    }

    onToggleMute() {
        this._isMuted = this.voiceService.toggleMute();
        this.notifyPropertyChange('isMuted', this._isMuted);
    }

    onLeaveRoom() {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser && this._room) {
            this.voiceService.leaveVoiceRoom();
            this.roomService.leaveRoom(this._room.id, currentUser.id);
            Frame.topmost().navigate({
                moduleName: 'pages/rooms/room-list-page',
                clearHistory: true
            });
        }
    }

    private refreshParticipants() {
        // In a real app, this would be updated via WebSocket
        this._participants = this._room.participants.map(id => {
            return {
                id,
                username: `User ${id}`,
                isSpeaking: false,
                isMuted: false
            };
        });
        this.notifyPropertyChange('participants', this._participants);
    }
}