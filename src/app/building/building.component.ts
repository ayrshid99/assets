import { saveBuilding } from './../reducers';
import { AppState } from './../domain/AppState';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Building } from '../domain/building'
import { BuildingService } from '../services/building.service'
import { AlertService } from '../services/alert.service'

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {
  updateUrl: string;

  building: Building

  public events: any[] = [];

  buildingSavedSuccess: string = "Building Saved Successfully"
  editing: boolean = false;


  constructor(private _buildingService: BuildingService,
    private alertService: AlertService, private store: Store<AppState>) {

  }



  ngOnInit() {

    this.clear();

  }


  save(form) {
    if (form.valid) {


      if (this.editing) {
        this._buildingService.update(this.updateUrl, this.building).subscribe(response => {
          //  this.alertService.success("Updated Successfully");
          this.editing = false;
          this.updateUrl = "";

        },

          error => {
            console.log("some error occured")
            this.alertService.error(error)
          }
        )
      }

      else {
        this.store.dispatch(saveBuilding(this.building))
      }




    }


  }


  onEdit(url: string) {


    this._buildingService.getBuilding(url).subscribe(response => {
      console.log(JSON.stringify(response))
      this.building.name = response.name;
      this.building.description = response.description;
      this.updateUrl = response._links.self.href;
      this.editing = true

    })

  }

  cancel() {

    this.editing = false
    this.clear();
  }

  clear() {
    this.building = { name: "", description: "" }
  }
}
