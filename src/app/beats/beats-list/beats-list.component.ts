import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { MatTableDataSource } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from "@angular/fire/firestore";
import { BeatsListService } from '../beats-list.service';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'pdi-beats-list',
  templateUrl: './beats-list.component.html',
  styleUrls: ['./beats-list.component.scss']
})
export class BeatsListComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<any>;
  itemColumns = ["track", "path", "play"];
  audio: HTMLAudioElement;

  constructor(
    public beatsListService: BeatsListService,
    private auth: AuthService,
    public afs: AngularFirestore,
    public storage: AngularFireStorage
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.auth.user.pipe(
      switchMap(user => this.afs.collection<any>(`beats/${user.uid}/tracks`).valueChanges())
    ).subscribe(beatList => this.dataSource = new MatTableDataSource(beatList));

  }

  playTrack(beatData) {
    if(typeof this.audio === 'object') {
      this.audio.pause();
    }

   this.beatsListService.getMusic(beatData.path)
    .subscribe(url => {
      this.audio = new Audio();
      this.audio.src = url;
      this.audio.load();
      this.audio.loop = true;
      this.audio.play();
    });
    
  }

  stopTrack(beat) {
    // check url for match this stops all sound
    if(typeof this.audio === 'object') {
      this.audio.pause();
    }
  }

  removeTrack(beat) {
    this.beatsListService.deleteTrack(beat);
  }

  addCallabo(beat) {
    this.beatsListService.createCallabo(beat)
      .then(() => console.log('created a callab record'))
      .catch(err => console.log(err));
  }

}
