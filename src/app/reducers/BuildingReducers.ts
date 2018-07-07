import { Action } from '@ngrx/store';




export const LOAD_BUILDINGS = "LOAD_BUILDINGS"
export const BUILDINGS_LOADED = "BUILDINGS_LOADED"
export const SAVE_BUILDING = "SAVE_BUILDING"
export const UPDATE_BUILDING = "UPDATE_BUILDING"


export function loadBuildings(pageAndSortColumn) {
    return {

        type: LOAD_BUILDINGS,
        payload: pageAndSortColumn
    }
}


export function buildingsLoaded(buildings) {
    return {

        type: BUILDINGS_LOADED,
        payload: buildings
    }
}

export function saveBuilding(building) {
    return {

        type: SAVE_BUILDING,
        payload: building
    }
}

export function updateBuilding(building) {
    return {

        type: UPDATE_BUILDING,
        payload: building
    }
}




const initialState = {}




export function buildingReducer(state: any = initialState, action: Action) {

    console.log("inside building reducer " + action.type)
    switch (action.type) {

        case LOAD_BUILDINGS: {

            return Object.assign({}, state, { loading: true })

        }


        case BUILDINGS_LOADED: {

            console.log("buildings loaded in reducers")
            console.log(action.payload)
            return Object.assign({}, action.payload, { loading: true })
        }

        case SAVE_BUILDING: {

            return state

        }





        default:
            return state

    }

}