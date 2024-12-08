import { NavigatedData, Page } from '@nativescript/core';
import { RoomViewModel } from './room-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const roomId = args.context.roomId;
    page.bindingContext = new RoomViewModel(roomId);
}