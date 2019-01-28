import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { Loop } from "./looper.model";

export enum LoopActionTypes {
    LOAD_LOOP = '[Loop] Load Loop',
    LOAD_LOOP_SUCCESS = '[Loop] Load Loop Success',
    LOAD_LOOP_ERROR = '[Loop] Load Loop Error',
}
export class LoadLoop implements Action {
    readonly type = LoopActionTypes.LOAD_LOOP
    constructor(public payload: {loop: Loop}){}
}

export class LoadLoopSuccess implements Action {
    readonly type = LoopActionTypes.LOAD_LOOP_SUCCESS
    constructor(public payload: {loop: Loop}){}
}

export class LoadLoopError implements Action {
    readonly type = LoopActionTypes.LOAD_LOOP_ERROR
    constructor(public payload: {error: any}){}
}

export type LoopActions = 
| LoadLoop
| LoadLoopSuccess
| LoadLoopError;