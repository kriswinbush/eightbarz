import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { CallabOverlayService } from '../../looper/callab-overlay.service';
import { DawControlsService } from '../../looper/services/daw-controls.service';
@Component({
  selector: 'pdi-callab-list',
  templateUrl: './callab-list.component.html',
  styleUrls: ['./callab-list.component.scss']
})
export class CallabListComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<any>;
  callabColumns = ["beatId"/* , "beatMakerId", "beatPath", "beatTrack", "callabId" */];

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private callabOverlay: CallabOverlayService,
    private daw: DawControlsService
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.auth.user.pipe(
      switchMap(user => this.afs.collection<any>(`callabs/${user.uid}/beats`).valueChanges())
    ).subscribe( callabList => { 
      console.log(callabList);
      this.dataSource = new MatTableDataSource(callabList)
    });
  }
  openDAW(beat) {
    // daw loadmusic
    this.daw.loadMusic(beat)
      .subscribe(soundSamples => {
        console.log("instance from callablist comp")
        console.log("sound Samples object", soundSamples);
        beat.soundSamples = soundSamples;
        soundSamples.buffer.loadAll()
          .then(data => this.callabOverlay.open({},beat)  )
        
      });
  }
}
