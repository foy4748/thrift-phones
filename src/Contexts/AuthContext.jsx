const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import toast from "react-hot-toast";

import { createContext, useEffect, useState } from "react";
import firebaseApp from "../firebase.config";
import {
  getAuth,
  deleteUser,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const auth = getAuth(firebaseApp);
export { auth };
const googleAuthProvider = new GoogleAuthProvider(auth);
const githubAuthProvider = new GithubAuthProvider(auth);

const userContext = createContext(null);
export { userContext };

export default function AuthContext({ children }) {
  const [activeUser, setActiveUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  //------------------------------
  useEffect(() => {
    const persist = onAuthStateChanged(auth, (user) => {
      setActiveUser(user);
      setAuthLoading(false);
    });

    return () => persist();
  }, []);

  // Auth Handling functions

  // Login Handlers
  const loginHandler = (email, password) => {
    setAuthLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLoginHandler = () => {
    setAuthLoading(true);
    return signInWithPopup(auth, googleAuthProvider);
  };

  const githubLoginHandler = () => {
    setAuthLoading(true);
    return signInWithPopup(auth, githubAuthProvider);
  };

  // Register Handlers
  const registerHandler = (email, password) => {
    setAuthLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (profileObj) => {
    return updateProfile(auth.currentUser, profileObj);
  };

  // TOKEN REQUESTING FUNCTION
  const requestToken = async (uid) => {
    const headers = {
      "Content-Type": "application/json",
      uid,
    };
    const res = await fetch(`${SERVER}/auth`, { headers });
    const result = await res.json();
    window.localStorage.setItem("authtoken", result.authtoken);
  };

  //POST USER DATA on MONGODB WHILE CREATING NEW USER
  const postUserOnMongo = async (user, role, displayName, photoURL) => {
    try {
      const { uid, email } = user;
      const userObj = { uid, email, role: [role], displayName, photoURL };
      const payload = JSON.stringify(userObj);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      };
      const res = await fetch(`${SERVER}/users`, options);
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  // User Delete Handler
  const userDelete = () => {
    deleteUser(auth.currentUser)
      .then(() => {
        toast.success("Deleted User from Firebase");
      })
      .catch((error) => {
        toast.error("Failed to Delete User");
      });
  };

  // LogOut Handler
  const logOutHandler = () => {
    return signOut(auth);
  };
  //------------------------------

  // PayLoad
  const contextPayLoad = {
    loginHandler,
    googleLoginHandler,
    githubLoginHandler,
    registerHandler,
    updateUserProfile,
    authLoading,
    activeUser,
    setActiveUser,
    logOutHandler,
    requestToken,
    setAuthLoading,
    postUserOnMongo,
    userDelete,
  };
  //------------------------------
  return (
    <userContext.Provider value={contextPayLoad}>
      {children}
    </userContext.Provider>
  );
}
