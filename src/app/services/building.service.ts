import { Store } from '@ngrx/store';
import { AppState } from './../domain/AppState';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { LoginState } from '../reducers'
import { Building } from '../domain/building'
import { LoginService } from "../services/login.service"
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'

@Injectable()
export class BuildingService {

  url: string = "http://localhost:8080/buildings";
  searchUrl: string;

  buildings: Building[] = [];
  private _buildingCreated: Subject<String> = new Subject<String>();




  get buildingCreated() {
    return this._buildingCreated
  }


  constructor(private _http: Http, private _loginService: LoginService, private store: Store<AppState>) {
    this.searchUrl = this.url + "/search/findByName";
  }
  save(building: Building) {

    return this.getHeaders().
      mergeMap(headers => this._http.post(this.url, building, { "headers": headers })
     
      )




  }
  handleError(error) {



    return Observable.throw(error || "Server Error");

  }

  list(page: Number=0, sortBy: string='name,asc ') {

    console.log("inside building list service....")
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', page.toString());
    params.set('sort', sortBy);

    return this.getHeaders().
      mergeMap(headers => this._http.get(this.url, { "headers": headers, "search": params }))


  }


  getBuilding(url: string) {

    this.getHeaders().
      mergeMap(headers => this._http.get(url, { "headers": headers })
        .map(response => response.json())





        .catch(this.handleError))

  }

  update(url: string, building: Building) {


    return this.getHeaders().
      mergeMap(headers => this._http.put(url, building, { "headers": headers, }))





  }


  delete(url: string) {

    return this.getHeaders().
      mergeMap(headers => this._http.delete(url, { "headers": headers, }))





  }
  getHeaders() {


    return this.store.select('login').map((state: LoginState) => {

      const headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=utf-8');
      headers.append('X-Requested-With', 'XMLHttpRequest');
      headers.append('authorization', state.token);
      headers.append("accept", 'application/json; charset=utf-8');


      return headers

    })

  }

  findByName(name: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('name', name);
    return this._http.get(this.searchUrl, { "headers": this.getHeaders(), "search": params })
      .map((response: Response) => {
        return response.json();


      }).catch(this.handleError)

  }


}
