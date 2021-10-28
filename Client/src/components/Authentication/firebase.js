import firebase from "firebase/compat"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyAhfPuljXQmwLIu92TC7WTo0PECSpcfG2U",
  authDomain: "productive-muslim-053738.firebaseapp.com",
  projectId: "productive-muslim-053738",
  storageBucket: "productive-muslim-053738.appspot.com",
  messagingSenderId: "988313181646",
  appId: "1:988313181646:web:eb66d5c93cc715da609f9f",
  measurementId: "G-E5PP6JCMGK",
})

export const auth = app.auth()
export default app
