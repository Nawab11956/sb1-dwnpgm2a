import { Observable } from '@nativescript/core';
import { Room } from '../models/room.model';

export class RoomService extends Observable {
    private rooms: Room[] = [];

    createRoom(name: string, description: string): Room {
        const room: Room = {
            id: Date.now().toString(),
            name,
            description,
            participants: [],
            createdAt: new Date(),
            isActive: true
        };
        this.rooms.push(room);
        return room;
    }

    getRooms(): Room[] {
        return this.rooms;
    }

    getRoomById(id: string): Room | null {
        return this.rooms.find(r => r.id === id) || null;
    }

    joinRoom(roomId: string, userId: string): void {
        const room = this.rooms.find(r => r.id === roomId);
        if (room && !room.participants.includes(userId)) {
            room.participants.push(userId);
        }
    }

    leaveRoom(roomId: string, userId: string): void {
        const room = this.rooms.find(r => r.id === roomId);
        if (room) {
            room.participants = room.participants.filter(id => id !== userId);
        }
    }
}