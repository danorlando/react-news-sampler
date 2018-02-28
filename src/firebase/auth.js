import { auth } from './firebase';

export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);


export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);


export const doSignOut = () =>
  auth.signOut();

export const onAuthStateChanged = () =>
  {
    let user;
    auth.onAuthStateChanged(authUser => {
      authUser ? user = authUser : user = null 
    })
    return user
  }


// Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);