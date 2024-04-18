import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { createContext, useEffect, useState } from "react";
import firebaseApp from "../firebase.config";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import axiosClient from "../axios";

const auth = getAuth(firebaseApp);
export { auth };
const googleAuthProvider = new GoogleAuthProvider(auth);
const githubAuthProvider = new GithubAuthProvider(auth);

const userContext = createContext(null);
export { userContext };

export default function AuthContext({ children }) {
  const [activeUser, setActiveUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();
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
    const { data: result } = await axiosClient.get(`/auth`, {
      headers: { uid },
    });
    window.localStorage.setItem("authtoken", result.authtoken);
  };

  //POST USER DATA on MONGODB WHILE CREATING NEW USER
  const postUserOnMongo = async (user, role, displayName, photoURL) => {
    try {
      const { uid, email } = user;
      const userObj = { uid, email, role: [role], displayName, photoURL };
      const { data: result } = await axiosClient.post(`/users`, userObj);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  // LogOut Handler
  const logOutHandler = () => {
    return signOut(auth);
  };

  // checking user whether deleted or not
  const checkUserOnMongo = async (uid) => {
    try {
      await axiosClient.get(`/users/${uid}`);
      await requestToken(uid);
      return true;
    } catch (error) {
      console.log(error);
      if (error.response?.status == 404) {
        toast.error("USER was DELETED by an ADMIN");
        logOutHandler()
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.error(error);
            toast.error("FAILED TO LOGOUT");
          });
      }
      return false;
    }
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
    checkUserOnMongo,
  };
  //------------------------------
  return (
    <userContext.Provider value={contextPayLoad}>
      {children}
    </userContext.Provider>
  );
}
