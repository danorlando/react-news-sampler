import { userConstants } from '../constants';
import { auth } from '../firebase';
import { NavigationFullscreen } from 'material-ui';


export const userActions = {
  onLoginFailed, onLoginSuccess, onLogOut, authStateChanged
} 

export function onLoginFailed() {
  return { type: userConstants.LOGIN_FAILURE } 
}

export function onLoginSuccess() {

   // dispatch(onAuthStateChange())
    return { type: userConstants.LOGIN_SUCCESS } 
}

export function onLogOut() {
  return dispatch => {
      auth.doSignOut();
    //  dispatch(onAuthStateChange())
  }
  return { type: userConstants.LOGOUT }
}

export function authStateChanged(user) {
  console.log(user)
  return {type: userConstants.AUTH_STATE_CHANGED, user}
}

export function onAuthStateChange() {

  auth.onAuthStateChanged(authUser => {
    authUser ? user = authUser : user = null 
  })
  return {type: userConstants.AUTH_STATE_CHANGED, user}
}

export function doCreateUserWithEmailAndPassword (email, password) {
  auth.createUserWithEmailAndPassword(email, password);
}

export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);


// Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);