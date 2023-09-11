import { Injectable } from '@angular/core';
import * as auth from 'firebase/auth';
import { User } from 'src/app/shared/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore
    ) { 
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                }
                return of(null);
            })
        );
    }
    
    async login(email: string, password: string): Promise<User> {
        try {
            const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
            this.updateUserData(user);
            return user;
        } catch (error) {
            console.log(error);
        }
    }
    
    async loginGoogle(): Promise<User> {
        try {
            const { user } = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
            this.updateUserData(user);
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async register(email: string, password: string): Promise<User> {
        try {
            const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
            // await this.sendVerificationEnail();
            return user;
        } catch(error) {
            console.log(error);
        }
    }

    async sendVerificationEnail(): Promise<void> {
        try {
            return (await this.afAuth.currentUser).sendEmailVerification();
        } catch (error) {
            console.log(error);
        }
    }

    async logout(): Promise<void> {
        try {
            return await this.afAuth.signOut();
        } catch (error) {
            console.log(error);
        }
    }

    async resetPassword(email: string): Promise<void> {
        try {
            return this.afAuth.sendPasswordResetEmail(email);
        } catch (error) {
            console.log(error);
        }
    }

    updateUserData(user: User) {
        const userRef:AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
        const data: User = {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            photoURL: user.photoURL
        };
        return userRef.set(data, {merge: true});
    }

    isEmailVerified(user: User) {
        return user.emailVerified;
    }
}
