import { AppActionTypes, AppActions } from "./app.actions";
import { App } from "./app.model";

export interface State {
    sidebar: boolean
}

const initialState: State = {
    sidebar: false
}

export function reducer(state:State = initialState, action:AppActions) {
    switch(action.type) {
        case AppActionTypes.OPEN: {
            return {
                ...state,
                sidebar: true
            }
        }
    }

}
