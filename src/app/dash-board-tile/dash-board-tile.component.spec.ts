/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashBoardTileComponent } from './dash-board-tile.component';

describe('DashBoardTileComponent', () => {
  let component: DashBoardTileComponent;
  let fixture: ComponentFixture<DashBoardTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
