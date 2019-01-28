import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadListService {
  user: User;
  constructor(
    private storage: AngularFireStorage,
    private auth: AuthService,
    private afs: AngularFirestore
  ) { 
    this.auth.user
      .subscribe( (user: User) => {
        this.user = user;
      })
  }

  getMusic(path) {
    return this.storage.ref(path).getDownloadURL();
  }
  
  createCallabo() {

  }
}
