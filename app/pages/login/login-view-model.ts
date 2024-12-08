import { Observable, Frame } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';

export class LoginViewModel extends Observable {
    private authService: AuthService;
    public username: string = '';

    constructor() {
        super();
        this.authService = new AuthService();
    }

    async onLogin() {
        if (!this.username || this.username.trim().length === 0) {
            // TODO: Show error dialog
            return;
        }

        try {
            await this.authService.login(this.username);
            Frame.topmost().navigate({
                moduleName: 'pages/rooms/room-list-page',
                clearHistory: true
            });
        } catch (error) {
            console.error('Login failed:', error);
        }
    }
}