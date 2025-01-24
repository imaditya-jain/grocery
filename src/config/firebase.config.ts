import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDWQiCrNUe8eu-mXJH46Keyb3mSb1CYBmg",
    authDomain: "todo---react-and-firebase.firebaseapp.com",
    projectId: "todo---react-and-firebase",
    storageBucket: "todo---react-and-firebase.appspot.com",
    messagingSenderId: "204498977088",
    appId: "1:204498977088:web:c5fbc7bf8634f3c11a7aa5"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export default storage