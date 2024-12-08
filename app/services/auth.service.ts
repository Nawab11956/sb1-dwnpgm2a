import { Observable } from '@nativescript/core';
import { User } from '../models/user.model';

export class AuthService extends Observable {
  private currentUser: User | null = null;

  login(username: string): Promise<User> {
    return new Promise((resolve) => {
      this.currentUser = {
        id: Date.now().toString(),
        username,
        isSpeeking: false,
        isMuted: false
      };
      resolve(this.currentUser);
    });
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
  }
}