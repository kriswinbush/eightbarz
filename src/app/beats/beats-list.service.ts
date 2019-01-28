import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, AuthService } from '../auth/auth.service';
import { FirestoreService, DbData } from '../core/firestore.service';
@Injectable({
  providedIn: 'root'
})
export class BeatsListService {
  user: User;
  constructor(
    private storage: AngularFireStorage,
    private auth: AuthService,
    private afs: AngularFirestore,
    private fireStoreService: FirestoreService
  ) { 
    this.auth.user
      .subscribe( (user: User) => {
        this.user = user;
      })
  }

  getMusic(path) {
    return this.storage.ref(path).getDownloadURL();
  }

  deleteTrack(data) {
    this.afs.collection(`beats/${this.user.uid}/tracks`).doc(data.id).delete()
      .then(() => this.storage.ref(data.path).delete())
      .catch((error) => console.error("Error removing document: ", error));
  }
  
  createCallabo(beatData) {
    console.log(beatData);
    const metaData: DbData = {
      baseCollectionPath: 'callabs',
      segmentCollectionPath: 'beats',
    }
    return this.fireStoreService.updateDb(metaData, beatData )
  } 
}

