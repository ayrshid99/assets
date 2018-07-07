import { Component,OnInit,Input,OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store'
import { LoginState} from './reducers'
import { Observable } from 'rxjs/Observable'
 import { LoginService } from './services/login.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
 


 private authenticated:Observable<boolean>
  private loading:Observable<boolean>

constructor(private loginService:LoginService,private store:Store<{}>){


}
  ngOnInit(){

this.authenticated=  this.store.select('login').map((state:LoginState) => state.isAuthenticated)
  
    this.loading=this.store.select('loading')

}



ngOnDestroy(){
}

  
}
