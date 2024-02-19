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
          <h1>Thank you for signing in {user.email}</h1>
          <button onClick={() => signOut(auth)}>logout</button>
        </div>
      );
    }
  }
}

export default App;
