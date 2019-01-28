import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../auth/auth.service';
import { UploadService, Beat } from '../upload.service';

@Component({
  selector: 'pdi-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  uploadedFileName = "Upload Bars or beats";
  uploadMusicType: any[] = [
    {value: 'bars-0', viewValue: 'Bars'},
    {value: 'beats-1', viewValue: 'Beats'},
  ];
  
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  user: User;
  beatsCollection: AngularFirestoreCollection<Beat>;
  beats: Observable<Beat[]>;

  @ViewChild('beatInput') beatInput: ElementRef;

  constructor( public upload: UploadService ) { }

  ngOnInit() {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  selectedFile(event) {
    console.log(event);
    this.upload.uploadBeatData(event);
    this.beatInput.nativeElement.value = '';
  }
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
} 
