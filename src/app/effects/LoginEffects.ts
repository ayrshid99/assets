
import { Injectable } from '@angular/core';
import { LoginService ,AlertService,DashboardService} from '../services';
import { Effect,Actions } from '@ngrx/effects'
import {loadingCompletedAction,DASHBOARD,LOGINSUCCESS,Dashboard ,LOGINSTART,loginSuccess,loginFailure,dashboardLoaded,loadDashboardAction,loadingAction} from '../reducers'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/concatMap'

import 'rxjs/add/operator/do'
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
  import { go, replace, search, show, back, forward } from '@ngrx/router-store';
 
 
 const DASHBOARD_ROW_TILES=5;

 @Injectable()
export class LoginEffects{
constructor( private dashboardService:DashboardService, private loginService:LoginService,private actions:Actions,private alertService:AlertService ){

}





@Effect() login$=this.actions.ofType(LOGINSTART).
map((action) => action.payload).
mergeMap(data=> this.loginService.login(data).
map((response) => {
  console.log("response is " + response)
let token =response.json().token
let username=this.loginService.getUsername(token)
let roles=this.loginService.getRoles(token)



 return  loginSuccess( { token:token,username:username,roles:roles })


}).catch((error)=> {

    this.alertService.error(Observable.of({"type":"error","message":"wrong username"}))
   return  Observable.of(loginFailure(error.status))
})

)










@Effect() dashboard$=this.actions.ofType(LOGINSUCCESS).
map(action => action.payload).
mergeMap(jwtToken => this.dashboardService.getCateogryAndCount(jwtToken.token).
map((categoryAndCount) =>  {


//divide array into sub arrays of size 5
let cnc:Dashboard[]=categoryAndCount.json();
let result=[]
let i=0;
 while( cnc.length > 0 )
 {
//   console.log(data.splice(0,5));
       result[i++]=cnc.splice(0,DASHBOARD_ROW_TILES+1);
 } 
return loadDashboardAction(result)

})


.mergeMap(dashboardAction=> Observable.of(dashboardAction, show(['/dashboard'])))


)




}