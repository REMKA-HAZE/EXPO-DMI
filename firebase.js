
import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAF_80gd40DUd2SqFq7rn2k_1FImhuPCjs",
  authDomain: "desarrollomovil-5bb23.firebaseapp.com",
  projectId: "desarrollomovil-5bb23",
  storageBucket: "desarrollomovil-5bb23.appspot.com",
  messagingSenderId: "844911522633",
  appId: "1:844911522633:web:014f2e57ddb3a703e8e098"
};


let app;
if (firebase.apps.length === 0) {
  console.info({ firebase });
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

const db = firebase.firestore();

export { auth, db };
