import * as firebase from 'firebase';

const  config = {
  apiKey: "AIzaSyB8WO2g_A4ilLsCOfiTBqw962D6T0VXWeM",
  authDomain: "newsfeed-fav.firebaseapp.com",
  databaseURL: "https://newsfeed-fav.firebaseio.com",
  projectId: "newsfeed-fav",
  storageBucket: "newsfeed-fav.appspot.com",
  messagingSenderId: "991847211226"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};