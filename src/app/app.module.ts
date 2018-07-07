import { BuildingEffects } from './effects/BuildingEffects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { DashBoardTileComponent } from './dash-board-tile/dash-board-tile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { LoginService } from './services/login.service'
import { DashboardService } from './services/dashboard.service'

import { AuthGuard } from './guards/AuthGuard';
import { BuildingComponent } from './building/building.component'
import {BuildingService} from './services/building.service';

import { BuildingListComponent } from './building/building-list.component';
import { NumberToArrayPipe } from './pipes/number-to-array.pipe';
import { AlertComponent } from './alert/alert.component'
import { AlertService } from './services/alert.service'
import  {StoreModule} from '@ngrx/store'

import {EffectsModule} from '@ngrx/effects'

import {entityCreationReducer,loadingReducer, loginReducers,dashboardReducer,buildingReducer } from './reducers'
import { LoginEffects } from './effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';
import {routeDefinitions} from './RouteDefinitions'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SideMenuComponent,
    DashBoardTileComponent,
    DashboardComponent,
    BuildingComponent,
    BuildingListComponent,
    NumberToArrayPipe,
    AlertComponent,
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    StoreModule.provideStore(
      {entitiesCreated: entityCreationReducer, loading:loadingReducer, login: loginReducers,dashboard:dashboardReducer,router:routerReducer,buildings:buildingReducer }
      ),
    EffectsModule.run(LoginEffects),
        EffectsModule.run(BuildingEffects),

     StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
        RouterStoreModule.connectRouter(),
    RouterModule.forRoot(routeDefinitions)
  ],
  providers: [AuthGuard,LoginService,DashboardService,BuildingService,AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
