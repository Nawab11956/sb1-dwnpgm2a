import { EventData, Page, NavigatedData } from '@nativescript/core';
import { RoomListViewModel } from '../viewmodels/room-list-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new RoomListViewModel();
}

export function onRoomTap(args: EventData) {
    const viewModel = args.object.bindingContext;
    viewModel.joinRoom(args.index);
}