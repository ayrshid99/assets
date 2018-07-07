import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from '../services/login.service'
import { AlertService } from '../services/alert.service'

import { ITokenRole } from '../domain/ITokenRole'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable'
import { LOGINSTART,LoginState ,LOGINSUCCESS,Message} from '../reducers'
import {AppState} from '../domain/AppState'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  
  userCredentials: String;
  loading: Observable<boolean>;
  lastUrl: string;
  message: Observable<Message>  
  constructor(private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router, private alertSerivce: AlertService,private  store : Store<AppState>) {


  }

  ngOnInit() {
    
    console.log("login initialzed....")
    this.loading=this.store.select('loading')
    
    
    /*this.loginService.logout();
    this.lastUrl = this.route.snapshot.params['returnUrl'] || "dashboard";
    

*/

  }


  onSubmit(data: NgForm) {
   

console.log("submitted........")
this.store.dispatch({type:LOGINSTART ,payload:data.value})
  //  this.loading = true;
 console.log(JSON.stringify(data.value));


this.message=this.store.select('login').map((state:LoginState) => state.message)


     

    


  }

}
