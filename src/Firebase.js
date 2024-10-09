// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4Ur6tHnvR_jgpV4UjStIL4Ri2JpYV4sc",
  authDomain: "final-project-e7f58.firebaseapp.com",
  projectId: "final-project-e7f58",
  storageBucket: "final-project-e7f58.appspot.com",
  messagingSenderId: "760862744177",
  appId: "1:760862744177:web:d721bcc783bc6e3f5a45d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

 

export { auth };