import { Injectable } from '@angular/core';
import {AuthService, User} from '../auth/auth.service'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';

export interface DbData {
  baseCollectionPath: string;
  segmentCollectionPath: string;
}

export interface Callab {
  beatId: string;
  authorId: string;
}
export interface Shape {

}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  user: User;
  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
    
  ) {
    this.auth.user
      .subscribe( (user: User) => {
        this.user = user;
      });
  }
  saveFileInStorage(config, file) {
    //const file = event.item(0);
    if (file.type.split('/')[0] !== 'audio') {
      console.error('supported file type :( '); // 4:56 rules
    }
    let downloadURL = '';
    // change to baseCofig
    let path = `bars/${new Date().getTime()}_${file.name}`;

    const customMetadata = {app: 'Callaboz PWA'};

    var task = this.storage.upload(path, file, { customMetadata });

    task.snapshotChanges().pipe(
      tap(snap => {
        if(snap.bytesTransferred === snap.totalBytes) {
          // this.updateDb(path, file.name);
        }
      }),
      // finalize(() => downloadURL = this.storage.ref(path).getDownloadURL())
    ).subscribe();
    // this.percentage = this.task.percentageChanges();
  }
  updateDb({baseCollectionPath, segmentCollectionPath}: DbData, data ) {
    const dbRef: AngularFirestoreCollection<Callab> = this.afs.collection(`${baseCollectionPath}/${this.user.uid}/${segmentCollectionPath}`);
    const id = this.afs.createId();
    const callabData = {
      callabId: id,
      beatId: data.id,
      beatPath: data.path,
      beatTrack: data.track,
      beatMakerId: data.beatMakerId
    }
    return dbRef.doc(id).set(callabData);
  }
}
