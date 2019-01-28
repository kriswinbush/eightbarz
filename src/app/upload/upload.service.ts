import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AuthService, User } from '../auth/auth.service';

export interface Beat {
  id: string;
  path: string;
  track: string;
  beatMakerId: string;
}
export interface Bars {
  id: string;
  path: string;
  lyrics: string;
}
export interface Callabo {
  track: Beat;
  bars: Bars;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  beats: Observable<Beat[]>;
  user: User;
  beatsCollection: AngularFirestoreCollection<Beat>;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  percentage: Observable<number>;
  lyricsCollection: AngularFirestoreCollection<Callabo>
  callaboz: Observable<Callabo>;
  lyrics: Observable<Callabo[]>;

  constructor(
    private storage: AngularFireStorage,
    private auth: AuthService,
    private afs: AngularFirestore
  ) { 
    this.auth.user
      .subscribe( (user: User) => {
        this.user = user;
        this.beatsCollection = this.afs.collection(`beats/${user.uid}/track`);
        this.beats = this.beatsCollection.valueChanges();

        this.lyricsCollection = this.afs.collection(`bars/${user.uid}/lyrics`);
        this.lyrics = this.lyricsCollection.valueChanges();
        console.log(this.beats);
      })
  }

  uploadBeatData(event: FileList) {
    const file = event.item(0);
    if (file.type.split('/')[0] !== 'audio') {
      console.error('supported file type :( '); // 4:56 rules
    }

    const path = `beats/${new Date().getTime()}_${file.name}`;

    const customMetadata = {app: 'Callaboz PWA'};

    this.task = this.storage.upload(path, file, { customMetadata });

    this.task.snapshotChanges().pipe(
      tap(snap => {
        if(snap.bytesTransferred === snap.totalBytes) {
          this.updateBeatData(path, file.name);
        }
      }),
      finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())
    ).subscribe();
    this.percentage = this.task.percentageChanges();
  }

  updateBeatData(path, trackName) {
    const beatRef: AngularFirestoreCollection<Beat> = this.afs.collection(`beats/${this.user.uid}/tracks`);
    const id = this.afs.createId();
    const data: Beat = { path, track: trackName, id, beatMakerId: this.user.uid };
    return beatRef.doc(id).set(data)
  }
}
