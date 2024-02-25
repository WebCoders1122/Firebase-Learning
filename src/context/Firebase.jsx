import { app } from "../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import { createContext, useContext } from "react";

const firebaseAuth = getAuth(app);
const database = getDatabase(firebaseAuth);

// context
const firebaseContext = createContext(null);
export const useFirebase = useContext(firebaseContext);

export const FirebaseProvider = ({ children }) => {
  const signUpUserWithEmailAndPasswore = () => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const putData = (key, data) => {
    return set(ref(database, key), data);
  };
  return (
    <FirebaseProvider.Provider
      value={{
        signUpUserWithEmailAndPasswore,
        putData,
      }}>
      {children}
    </FirebaseProvider.Provider>
  );
};
