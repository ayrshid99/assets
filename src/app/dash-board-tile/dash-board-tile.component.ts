import { Component, OnInit ,Input} from '@angular/core';

@Component({
 selector: 'app-dash-board-tile',
  templateUrl: './dash-board-tile.component.html',
  styleUrls: ['./dash-board-tile.component.css']
})
export class DashBoardTileComponent implements OnInit {

 @Input() name:string;
 @Input() count:number;
@Input() i:number;

  constructor() { }

  ngOnInit() {
  }

}
