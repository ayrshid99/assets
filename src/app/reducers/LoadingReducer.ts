import { LOAD_BUILDINGS, BUILDINGS_LOADED } from './BuildingReducers';
import { DASHBOARD } from './DashboardReducer';
import { LOGINSTART, LOGINSUCCESS, LOGINFAILURE } from './LoginReducers';
import { Action } from '@ngrx/store';
const initialState = false


export const LOADING = "LOADING"
export const LOADING_COMPLETED = "LOADING_COMPLETED"



export function loadingCompletedAction() {
    return {
        type: LOADING_COMPLETED,
        payload: true
    }
}


export function loadingAction() {
    return {
        type: LOADING,
        payload: true
    }
}
export function loadingReducer(state: boolean = initialState, action: Action) {


    switch (action.type) {

        case LOGINSTART:
        case LOAD_BUILDINGS:

        {
            console.log("LOADING REDUCER>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

            return true;
        }
        case DASHBOARD:
        case BUILDINGS_LOADED:
        case LOGINFAILURE:
        {
            return initialState
       
         }
          default:
            return state
    }

}