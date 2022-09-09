import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signOut,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private Http: HttpClient,
    private auth: Auth,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}
  public isUserLoggedIn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      this.auth.onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
  login() {
    // console.log(this.getIdToken());
    return from(
      new Promise<string>(async (resolve, reject) => {
        try {
          let credential = await signInWithPopup(
            this.auth,
            new GoogleAuthProvider()
          );
          let idToken = await credential.user.getIdToken();
          console.log(idToken);
          resolve(idToken);
        } catch (error) {
          reject('login error');
        }
      })
    );
  }
  async logOut() {
    return from(
      new Promise<string>(async (resolve, reject) => {
        try {
          await signOut(this.auth);
          resolve('log out successfull');
        } catch {
          reject('Can not login with Google');
        }
      })
    );
  }
  getIdToken() {
    return from(
      new Promise<string>(async (resolve, reject) => {
        try {
          onAuthStateChanged(this.auth, async (user) => {
            if (user) {
              let user = getAuth().currentUser;
              let idToken = await user!.getIdToken(true);
              console.log(idToken);
              resolve(idToken);
            } else {
              resolve('');
            }
          });
        } catch (err) {
          reject(err);
        }
      })
    );
  }

  register(email: string, password: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(
      () => {
        alert('Register Successfull!!!');
        this.router.navigate(['/']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/']);
      }
    );
  }

  loginWithAccount(email: string, password: string) {
    console.log(email, password);
    this.getIdToken();
    // this.afAuth.idToken.subscribe((token) => {
    // });
    this.afAuth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['/']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/']);
      }
    );
  }
}
