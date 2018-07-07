import { Observable } from 'rxjs/Observable';
import { LOAD_BUILDING, loadBuildings } from './../reducers/';
import { AppState } from './../domain/AppState';
import { Store } from '@ngrx/store';
import { Output, Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { BuildingService } from '../services/building.service'
import { AlertService } from '../services/alert.service'


import { Building } from '../domain/building'

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit, OnDestroy {
  url: string = "http://localhost:8080/buildings"
  list: Observable<any[]>
  page: any = {};
  columns = [{col:"name",sortable:true}, {col:"description",sortable:true}, {col:"Actions"}];
  private _sortColumn: string = "name";
  private _sortOrder: string = "asc";
  constructor(private store: Store<AppState>, private _buildingService: BuildingService, private alertService: AlertService) { }
  building: Building = { name: "", description: "" };
  l: Observable<any>
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifyCreate:EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {


    this.list = this.store.select("buildings").
      map((state: any) => state._embedded).
      map(_embedded => _embedded.buildings)
    this.store.select("buildings")
      .map((state: any) => state.page)
      .subscribe(page => this.page = page)
    console.log("got buildings.........")

//listen to changes for creating new building..

this.store.select("entitiesCreated").
map((state:any) => state.buildingCreated).
subscribe((status) =>  {

if(status)  
this.store.dispatch(loadBuildings({ page: this.page.number, sortBy: this.sortBy }))
}
)

this.store.select("entitiesCreated").
map((state:any) => state.buildingUpdated).
subscribe((status) =>  {

if(status)  
this.store.dispatch(loadBuildings({ page: this.page.number, sortBy: this.sortBy }))
}
)




    // this.loadPage(0, this.sortBy);


    /*
        this._buildingService.buildingCreated.subscribe(message => {
    
          this.loadPage(this.page.number, this.sortBy)
    
        })*/
  }


  ngOnDestroy() {

    this._buildingService.buildingCreated.unsubscribe();
  }

  //change sorting column and order
  setSortColumn(column) {
    if (this.sortColumn == column) {
      this.toggleSortOrder();
    }
    else {
      this.sortColumn = column;
      this.sortOrder = "asc"

    }

    this.store.dispatch(loadBuildings({ page: this.page.number, sortBy: this.sortBy }));

  }

  toggleSortOrder() {
    if (this.sortOrder == "asc")
      this.sortOrder = "desc"
    else
      this.sortOrder = "asc"
  }


  get sortColumn() {

    return this._sortColumn;
  }

  set sortColumn(column) {
    this._sortColumn = column;
  }


  get sortOrder() {
    return this._sortOrder;
  }


  set sortOrder(sortOrder) {
    this._sortOrder = sortOrder;
  }


  private get sortBy() {
    let s = this.sortColumn + "," + this.sortOrder;
    return s;
  }


  onNextPage(page: Number) {

    console.log("page to load is " + page)
    
    this.store.dispatch(loadBuildings({ page: page, sortBy: this.sortBy }));

  }



 



  //editing realted functions..





  onEdit(url: string) {
    //notify parent component so that it can display it in form..
    this.notify.emit(url)

  }

  onDelete(url: string) {
    if (confirm('Are you sure you want to delete this?')) {
      this._buildingService.delete(url).subscribe(response => {
        // this.alertService.success("Deleted Successfully")
    this.store.dispatch(loadBuildings({ page: this.page.number, sortBy: this.sortBy }));

      })
    }


  }
}


