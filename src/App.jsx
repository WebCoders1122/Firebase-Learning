import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "./firebase";
import "./App.css";
import SignUpPage from "./Pages/SignUpPage";
import SigninPage from "./Pages/SigninPage";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("you are logged out");
        setUser(null);
      }
    });
  }, []);
  {
    if (user === null) {
      return (
        <div>
          <SignUpPage />
          <SigninPage />
        </div>
      );
    } else {
      return (
        <div className='app'>
          <h1 className='text-xl font-semibold'>
            Thank you for signing in {user.email}
          </h1>
          <button
            className='bg-slate-600 text-white text-2xl font-bold py-2 px-5 m-3 rounded-lg'
            onClick={() => signOut(auth)}>
            logout
          </button>
        </div>
      );
    }
  }
}

export default App;
