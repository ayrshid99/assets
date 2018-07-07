import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BuildingComponent } from './building/building.component';
import {AuthGuard } from './guards'
export const   routeDefinitions:Route[]=[

{path:"login" ,component: LoginComponent },
{path:"dashboard" , component:DashboardComponent ,canActivate: [AuthGuard]},

{path:"building" , component:BuildingComponent ,canActivate: [AuthGuard]},

{path:"" , redirectTo:"dashboard" , pathMatch:"full"}


]

