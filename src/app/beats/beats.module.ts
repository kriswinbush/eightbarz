import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { UploadModule } from '../upload/upload.module';
import { BeatsListComponent } from './beats-list/beats-list.component';
import { BeatsContainerComponent } from './beats-container/beats-container.component';

@NgModule({
  declarations: [
    BeatsListComponent,
    BeatsContainerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UploadModule
  ],
  exports: [
    BeatsContainerComponent
  ]
})
export class BeatsModule { }
