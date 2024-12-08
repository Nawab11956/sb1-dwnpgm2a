import { NavigatedData, Page } from '@nativescript/core';
import { RoomListViewModel } from './room-list-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new RoomListViewModel();
}