import { useEffect, useState } from "react";
import { app } from "../firebase";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";

const RealtimeDatabase = () => {
  const [id, setID] = useState(null);
  let db = getDatabase(app);
  const writeData = async () => {
    await set(ref(db, "users/mothers"), { id: 2, name: "fatima" });
  };
  const readData = async () => {
    await get(child(ref(db), "users/mothers")).then((snap) =>
      console.log(snap.val())
    );
  };
  useEffect(() => {
    onValue(ref(db, "users"), (snap) => setID(snap.val().mothers.id));
  }, []);
  return (
    <div>
      <h1>{id}</h1>
      <button
        onClick={writeData}
        className='bg-slate-600 text-white text-2xl font-bold py-2 px-5 m-3 rounded-lg'>
        Write Data
      </button>
      <button
        onClick={readData}
        className='bg-slate-600 text-white text-2xl font-bold py-2 px-5 m-3 rounded-lg'>
        Read Data
      </button>
    </div>
  );
};

export default RealtimeDatabase;
