import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { UploadComponent } from './upload/upload.component';
import { DropzoneDirective } from './dropzone.directive';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadListComponent } from './upload-list/upload-list.component';

@NgModule({
  declarations: [
    UploadComponent,
    DropzoneDirective,
    UploadListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AngularFireModule,
    AngularFirestoreModule
  ],
  providers: [
    AngularFireStorage
  ],
  exports: [
    UploadComponent,
    UploadListComponent
  ]
})
export class UploadModule { }
