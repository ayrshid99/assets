import { Injectable,OnInit } from '@angular/core';
import { Http,Headers,Response }  from '@angular/http';
import { Observable }  from 'rxjs/Observable';
import { CategoryAndCountDto } from '../domain/CategoryAndCountDto'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import { LoginService } from './login.service'

@Injectable()
export class DashboardService {
url:string ="http://localhost:8080/dashboard";
constructor(private _http:Http , private loginService:LoginService) {




   }





getCateogryAndCount(token:string){


 const headers = new Headers();
  headers.append('Content-Type', 'application/json; charset=utf-8');
  headers.append('X-Requested-With','XMLHttpRequest');
  headers.append('authorization',token);
  headers.append("accept",'application/json; charset=utf-8');

  //send http request to get cateogry and count for dashboard..
  return  this._http.get(this.url,{'headers':headers})
  
}
handleError(error:Response){

console.log(JSON.stringify(error));
console.log(error)
return Observable.throw( 'server error');
}


}
