import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { BarsRoutingModule } from './bars-routing.module';
import { BarsContainerComponent } from './bars-container/bars-container.component';
import { BarsListComponent } from './bars-list/bars-list.component';

@NgModule({
  declarations: [BarsContainerComponent, BarsListComponent],
  imports: [
    CommonModule,
    BarsRoutingModule,
    MaterialModule
  ]
})
export class BarsModule { }
