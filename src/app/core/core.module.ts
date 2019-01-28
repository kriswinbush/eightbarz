import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdiNavComponent } from './pdi-nav/pdi-nav.component';
import { MaterialModule } from '../material/material.module';
import { ContainerComponent } from './container/container.component';
import { CoreRoutingModule } from './core-routing.module';
import { ItemsListComponent } from './items-list/items-list.component';
import { UploadModule } from '../upload/upload.module';

import { BeatsModule } from '../beats/beats.module';
import { BarsModule } from '../bars/bars.module';
import { CallabModule } from '../callab/callab.module';

@NgModule({
  declarations: [
    PdiNavComponent,
    ContainerComponent,
    ItemsListComponent     
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CoreRoutingModule,
    UploadModule,
    BeatsModule,
    BarsModule,
    CallabModule
  ],
  exports: [
    PdiNavComponent
  ]
})
export class CoreModule { }