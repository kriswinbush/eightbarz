import { Action } from "@ngrx/store";
import { App } from "./app.model";

export enum AppActionTypes {
    OPEN = '[App] Open'
}

export class OpenSidebar implements Action {
    readonly type = AppActionTypes.OPEN;
    constructor(public payload: App) {}
}

export type AppActions = |OpenSidebar
