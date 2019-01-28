import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UploadListDataSource } from '../upload-list/upload-list-datasource';
import { UploadService } from '../upload.service';
import { AuthService } from '../../auth/auth.service';
import { MatTableDataSource } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from "@angular/fire/firestore";
import { UploadListService } from '../upload-list.service';
@Component({
  selector: 'pdi-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss']
})
export class UploadListComponent implements OnInit, AfterViewInit {
  // dataSource: UploadListDataSource;
  dataSource: MatTableDataSource<any>;
  itemColumns = ["track", "path", "play"]
  constructor(public uploadListService: UploadListService, public uploadService: UploadService, private auth: AuthService, public afs: AngularFirestore) {
    console.log(uploadService.beats)
   }

  ngOnInit() {}

  ngAfterViewInit() {
    this.auth.user.pipe(
      switchMap(user => {
        return this.afs.collection<any>(`beats/${user.uid}/tracks`).valueChanges()
      })
    ).subscribe(beatList => {
        console.log(beatList);
        this.dataSource = new MatTableDataSource(beatList)
      } )

  }
  audio: HTMLAudioElement;

  playTrack(beatData) {
    if(typeof this.audio === 'object') {
      this.audio.pause();
    }

   this.uploadListService.getMusic(beatData.path)
    .subscribe(url => {
      this.audio = new Audio();
      this.audio.src = url;
      this.audio.load();
      this.audio.loop = true;
      this.audio.play();
    });
    
  }

  stopTrack(beat) {
    // check url for match 
    if(typeof this.audio === 'object') {
      this.audio.pause();
    }
  }

  removeTrack(beat) {
    // this.uploadService.deleteTrack(beat);
  }

  addCallabo(beat) {
    console.log(beat);
  }

}
