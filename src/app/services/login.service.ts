import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/observable/throw';
import { ITokenRole } from '../domain/ITokenRole'
import { Base64 } from '../domain/Base64'


@Injectable()
export class LoginService {


  TOKEN_KEY: string = "token";

  url: string = 'http://localhost:8080/auth';
  data: any;
  roles: string[];
  token: string
  authenticated: boolean = false;

  private _loggedIn: BehaviorSubject<boolean>;
  private _username: string;

  //getters and setters


  constructor(private _http: Http) {

    this._loggedIn = new BehaviorSubject<boolean>(false);

    if (localStorage.getItem(this.TOKEN_KEY) != null)
      this.setParameters();

  }


  get loggedIn() {

    return this._loggedIn;
  }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }


  get isAuthenticated() {
    return this.authenticated;
  }


  set isAuthenticated(authenticated) {
    this.authenticated = authenticated;
  }






  login(data) {

console.log("in login service")
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('X-Requested-With', 'XMLHttpRequest');
    headers.append("accept", 'application/json; charset=utf-8');
    return this._http.post(this.url, data, headers)
      


    // console.log(JSON.stringify(this.data))

  }



  setParameters() {

    this.token = localStorage.getItem("token")
    this.isAuthenticated = true;
    this.roles = this.getRoles(this.token)
    this.username = this.getUsername(this.token);
    this._loggedIn.next(true);

  }


  handleError(error: Response) {

    console.log(JSON.stringify(error.status));
    return Observable.throw(error || 'server error');
  }

  parseToken(token: string) {


    if (token) {
      let claims = this.getRoles(token);
      console.log(claims);
    }

  }


  parseClaims(token: string) {

    let arr = token.split(".");
    if (arr.length == 3)
      return arr[1];
    return undefined;

  }


  getRoles(token: string) {
    let claims = this.parseClaims(token);
    let base64 = new Base64();
    if (claims) {
     // console.log("claims are :"+base64.decode(claims))
      return JSON.parse(base64.decode(claims)).roles;
    }



    return undefined;
  }



  getUsername(token: string) {
    let claims = this.parseClaims(token);
    let base64 = new Base64();
    if (claims) {
      return JSON.parse(base64.decode(claims)).sub;
    }



    return undefined;
  }

  saveInLocalStorage(token: string, role: String[]) {

    window.localStorage.setItem(this.TOKEN_KEY, JSON.stringify(this.roles));
    window.localStorage.setItem("token", token);
  }

  getToken(): string {
    return this.token;
  }


  logout() {
    this.loggedIn.next(false)
    this.isAuthenticated = false;
    this.token = undefined;
    window.localStorage.removeItem("roles");
    window.localStorage.removeItem(this.TOKEN_KEY);

  }
}

