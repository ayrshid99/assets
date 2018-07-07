import { state } from '@angular/core';
import { Action } from '@ngrx/store';
export const BUILDING_CREATED = "BUILDING_CREATED"
export const BUILDING_UPDATED = "BUILDING_CREATED"


export function buildingCreatedAction() {

    return {
        type: BUILDING_CREATED
      
    }

}

export function buildingUpdatedAction() {

    return {
        type: BUILDING_UPDATED
      
    }

}


const initialState={

    buildingCreated:false,
    buildingUPdated:false
}
export function entityCreationReducer(state: any=initialState, action: Action) {
    switch (action.type) {
        case BUILDING_CREATED:
            return Object.assign({},state,{buildingCreated:true})

 case BUILDING_UPDATED:
            return Object.assign({},state,{buildingUPdated:true})

        default:
            return state
    }
}

