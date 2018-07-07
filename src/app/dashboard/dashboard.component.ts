import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../services/dashboard.service';

import { CategoryAndCountDto } from '../domain/CategoryAndCountDto';
import {Store} from "@ngrx/store"
import {Dashboard} from "../reducers"
import {Observable} from 'rxjs/Observable'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit {


categoryAndCount:Observable<any[]>;
url:string ="hthtp://localhost:8080/dashboard";

  constructor(public  store:Store<{}>) { }

  ngOnInit() {
 
this.categoryAndCount=this.store.select('dashboard').map((state:Dashboard[])=> state)

 
 
  }

}
