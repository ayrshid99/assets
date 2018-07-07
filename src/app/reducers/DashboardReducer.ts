import { ActionReducer, Action } from '@ngrx/store';
export const DASHBOARD = "DASHBOARD"
export const DASHBOARD_LOADED = "DASHBOARD_LOADED"

export interface Dashboard {

    category: string;
    count: number
}


export function loadDashboardAction(categoryAndCount) {
    console.log(DASHBOARD)
    return {

        type: DASHBOARD,
        payload: categoryAndCount
    }
}

export function dashboardLoaded(routeName: string) {

    return {

        type: DASHBOARD_LOADED,
        payload: routeName
    }
}

export const initialState = []




export function dashboardReducer(state: Dashboard, action: Action) {

    console.log("inside dashboard reducer " + action.type)
    switch (action.type) {


        case DASHBOARD: {
            return action.payload
        }
        case DASHBOARD_LOADED: {

            return state
        }

        default:
            return state

    }

}