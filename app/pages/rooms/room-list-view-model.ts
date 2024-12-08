import { Observable, Frame } from '@nativescript/core';
import { RoomService } from '../../services/room.service';
import { AuthService } from '../../services/auth.service';

export class RoomListViewModel extends Observable {
    private roomService: RoomService;
    private authService: AuthService;

    constructor() {
        super();
        this.roomService = new RoomService();
        this.authService = new AuthService();
        this.refresh();
    }

    get rooms() {
        return this.roomService.getRooms();
    }

    onCreateRoom() {
        const newRoom = this.roomService.createRoom(
            `Room ${this.rooms.length + 1}`,
            'Tap to join the conversation'
        );
        this.notifyPropertyChange('rooms', this.rooms);
    }

    joinRoom(index: number) {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            const room = this.rooms[index];
            this.roomService.joinRoom(room.id, currentUser.id);
            // TODO: Navigate to room view
        }
    }

    onLogout() {
        this.authService.logout();
        Frame.topmost().navigate({
            moduleName: 'pages/login/login-page',
            clearHistory: true
        });
    }

    private refresh() {
        this.notifyPropertyChange('rooms', this.rooms);
    }
}