import React, { createContext, useEffect, useState } from 'react'
import { app } from '../Firebase/firebase.init'
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"

export const authContext = createContext()
const auth = getAuth(app)

export const Authprovider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
  
    const signupEmail =(email, password)=>{
      setLoading(true)
     return createUserWithEmailAndPassword(auth, email, password)
    }
  
    const profileupdate = (profile)=>{
      setLoading(true)
   return updateProfile(auth.currentUser ,profile)
    }
  
  
    const loginEmail = (email, password) =>{
      setLoading(true)
     return signInWithEmailAndPassword(auth, email, password)
    }
  
    const logout = ()=>{
      return signOut(auth)
    }
  
    useEffect(() => {
      const unsubscrib = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser)
          setLoading(false)
  
      })
      return () => unsubscrib()
  }, [])
  
  
  
    const authInfo = {user, signupEmail, profileupdate, logout, loginEmail}
  
    return (
      <div>
          <authContext.Provider value={authInfo}>
              {children}
          </authContext.Provider>
      </div>
    )
}
