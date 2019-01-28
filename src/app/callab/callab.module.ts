import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { CallabRoutingModule } from './callab-routing.module';
import { CallabContainerComponent } from './callab-container/callab-container.component';
import { CallabListComponent } from './callab-list/callab-list.component';
import { LooperModule } from '../looper/looper.module';

@NgModule({
  declarations: [CallabContainerComponent, CallabListComponent],
  imports: [
    CommonModule,
    CallabRoutingModule,
    MaterialModule,
    LooperModule
  ]
})
export class CallabModule { }
