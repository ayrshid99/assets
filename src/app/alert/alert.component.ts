import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { AlertService } from '../services/alert.service'
import {Message} from '../reducers'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs/Observable'
import {LoginState} from '../reducers'
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
animations: [
  trigger('fadeInOut', [
    transition(':enter', [   // :enter is alias to 'void => *'
      style({opacity:0}),
      animate(500, style({opacity:1})) 
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      animate(500, style({opacity:0})) 
    ])
  ])
]
  
})
export class AlertComponent implements OnInit {

  message: Observable<Message>;

  constructor(private alertService: AlertService,private store:Store<{}>) { }

  ngOnInit() {

   this.message=this.store.select('login').map((state:LoginState) =>  state.message)
  }
}
