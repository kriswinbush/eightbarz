import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user: Observable<User>;
  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null);
        }
      })
    )
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  emailLogin(form) {
    return this.afAuth.auth.signInWithEmailAndPassword(form.username, form.password)
      .then(credentials => {
        console.log(credentials);
        this.updateUserData(credentials.user)
      })
  }

  oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credentials) => {
        this.updateUserData(credentials.user)
        this.router.navigate(['landing'])
      })
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`)

    const data: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
    };
    return userRef.set(data);
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(user => this.router.navigate(['/landing']));
  }
}
