import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Message} from '../reducers'
@Injectable()
export class AlertService {

m:Message={type:"",message:""}
 
 private subject = Observable.of(this.m)

    private keepAfterNavigationChange = false;

   constructor(){}

    success(message: Observable<Message>, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject=message;
    }

    error(message: Observable<Message>, keepAfterNavigationChange = false) {
      console.log("error occured")
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject=message

    }

    getMessage(): Observable<Message> {
        return this.subject
    }
}
