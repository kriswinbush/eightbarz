import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Loop } from "./looper.model";
import { LoopActionTypes, LoopActions } from "./looper.actions";

export interface State {
    name: string;
    url: string;
    id:string;
}

export const initialState: State = {
    name:"",
    url:"",
    id:''
}
export function reducer(state = initialState, action: LoopActions ): State {

    switch(action.type) {
        case LoopActionTypes.LOAD_LOOP: {
            return {
                ...state
            }
        }
    }
    
}