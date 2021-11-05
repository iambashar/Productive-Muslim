import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import firebase from "firebase/compat"

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedlistID, setSelectedListID] = useState();

  const googleProvider = new firebase.auth.GoogleAuthProvider();

function setListID(ID) {
  return setSelectedListID(ID);
}

function signInWithGoogle() {
  
  return auth.signInWithPopup(googleProvider)
}

function signup(email, password) {
  return auth.createUserWithEmailAndPassword(email, password)
}

function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
}

function logout() {
  return auth.signOut()
}

function resetPassword(email) {
  return auth.sendPasswordResetEmail(email)
}

function updateEmail(email) {
  return currentUser.updateEmail(email)
}

function updatePassword(password) {
  return currentUser.updatePassword(password)
}

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(user => {
    setCurrentUser(user)
    setLoading(false)
  })

  return unsubscribe
}, [])

const value = {
  currentUser,
  login,
  signup,
  logout,
  resetPassword,
  updateEmail,
  updatePassword,
  signInWithGoogle,
  selectedlistID,
  setListID
}

return (
  <AuthContext.Provider value={value}>
    {!loading && children}
  </AuthContext.Provider>
)
}
