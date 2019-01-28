import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadAudioComponent } from './load-audio/load-audio.component';

import { StoreModule } from "@ngrx/store";
import { reducer } from "./looper.reducer";

import { LooperRoutingModule } from "./looper-routing.module";

import {MatButtonModule} from '@angular/material/button';
import { CallabOverlayService } from './callab-overlay.service';
import { MaterialModule } from '../material/material.module';
@NgModule({
  imports: [
    CommonModule,
    /* StoreModule.forFeature('loops', reducer), */
    LooperRoutingModule,
    MatButtonModule,
    MaterialModule
  ],
  providers: [CallabOverlayService],
  declarations: [LoadAudioComponent],
  entryComponents: [
    LoadAudioComponent
  ]
})
export class LooperModule { }
