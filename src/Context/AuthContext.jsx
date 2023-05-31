import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import app from '../Firebase/Firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, updateProfile } from 'firebase/auth';
import { useEffect } from 'react';
export const auth = getAuth(app)
export const UserContext = createContext()
const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const facebookProvider = new GoogleAuthProvider()
    const userRegister = (email, password) => {
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const userLogIn =(email,password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
           console.log(currentUser);
           if(currentUser===null || currentUser.emailVerified){
               setUser(currentUser)
           }
            setLoader(false)
        });
        return ()=>unsubscribe
    }, [])
    const upDateUser= (name,photo)=>{
        console.log(name,photo);
        return updateProfile(auth.currentUser, {
            displayName:name, photoURL:photo
          })
    }
    const emailVerify = () =>{
        sendEmailVerification(auth.currentUser)
    }
    const restPassword = (email) =>{
        return sendPasswordResetEmail(auth,email)
    }
    const signInGoogle =()=>{
        return signInWithPopup(auth,googleProvider)
    }
    const signInFacebook =()=>{
        return signInWithRedirect(auth,facebookProvider)
    }
    const userSignOut = () =>{
        return signOut(auth)
    }
    const userValue = { user,userRegister,userLogIn,loader,setLoader,upDateUser,emailVerify,restPassword,signInGoogle,signInFacebook ,userSignOut}
    return (
        <UserContext.Provider value={userValue}>
            {children}
        </UserContext.Provider>
    );
};

export default AuthContext;