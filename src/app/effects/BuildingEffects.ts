import { BUILDING_UPDATED } from './../reducers/SortingReducer';
import { SAVE_BUILDING } from './../reducers/BuildingReducers';
import { Observable } from 'rxjs/Observable';
import { BuildingService } from './../services/building.service';
import { Action } from '@ngrx/store';
import { LOAD_BUILDINGS, buildingsLoaded,buildingCreatedAction } from './../reducers/';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';

@Injectable()
export class BuildingEffects {
    constructor(private actions: Actions, private buildingService: BuildingService) {

    }

    @Effect() loadBuildings$ = this.actions.ofType(LOAD_BUILDINGS).
        map((action: Action) => action.payload).
        mergeMap(payload => this.buildingService.list(payload.page, payload.sortBy)
            .mergeMap((response) => {
                console.log(JSON.stringify(response.json()))

                return Observable.of(buildingsLoaded(response.json()), show(['building']))

            }

            )


        )



@Effect() saveBuilding$= this.actions.ofType(SAVE_BUILDING).
map(action=> action.payload).
mergeMap(building =>  this.buildingService.save(building).
map(building => buildingCreatedAction())


@Effect() updateBuilding$=this.actions.ofType(BUILDING_UPDATED).
map(action=> action.payload).
mergeMap(building=> this.buildingService.update(building)
.map(building => buildingUpdatedAction)

).








}


