import { loadBuildings } from './../reducers/BuildingReducers';
import { LoginState } from './../reducers';
import { Observable } from 'rxjs/Observable';
import { AppState } from './../domain/AppState';
import { Store } from '@ngrx/store';
import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { LoginService } from '../services/login.service'

import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
username:Observable<string>
@Output() private eventEmitter =new EventEmitter();
  

constructor(private loginService:LoginService,private router:Router,private store:Store<AppState>) { }

  ngOnInit() {
    
this.username=this.store.select("login").map((state:LoginState) => state.username)

  }



logout() {
this.loginService.logout();
this.router.navigate(['login']);


}


loadBuildings(){
  
this.store.dispatch(loadBuildings({page:0,sortBy:'name , asc'}));

}

}
