import React from "react";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  getDocs,
  where,
  updateDoc,
} from "firebase/firestore";
import { app } from "../firebase";
import { FirebaseError } from "firebase/app";

const firestore = getFirestore(app);

const FirestorePage = () => {
  const addCollection = async () => {
    const result = await addDoc(collection(firestore, "cities"), {
      name: "islamabad",
      desc: "beautiful",
      date: Date.now(),
    });
    // console.log(result);
  };

  const addSubCollection = async () => {
    const resutl = await addDoc(
      collection(firestore, "cities/rDEda94OFdXS1QOxLUv1/places"),
      {
        area: "I-8/one",
        relative: "yes",
      }
    );
  };
  // to get a simple document
  const getDocument = async () => {
    const ref = doc(firestore, "users", "MD2DDQ2miCjwvFObK0Nf");
    let snap = await getDoc(ref);
    console.log(snap.data());
  };

  // get data with query (search)
  const getDocWithQuery = async () => {
    const collectionRef = collection(firestore, "cities");
    const q = query(collectionRef, where("desc", "==", "beautiful"));
    const snapshot = await getDocs(q);
    snapshot.forEach((data) => console.log(data.data()));
  };
  //update the document
  const updateDocument = async () => {
    const docRef = doc(firestore, "cities", "HXl3ozOtjhPXwrXfsA7Y");
    let snapshot = updateDoc(docRef, {
      name: "lahore city",
    });
  };
  return (
    <div>
      <button
        className='bg-slate-600 text-white text-2xl font-bold py-2 px-5 m-3 rounded-lg'
        onClick={addCollection}>
        Add data
      </button>
      <button
        className='bg-slate-600 text-white text-2xl font-bold py-2 px-5 m-3 rounded-lg'
        onClick={addSubCollection}>
        Add Sub data
      </button>
      <button
        className='bg-slate-600 text-white text-2xl font-bold py-2 px-5 m-3 rounded-lg'
        onClick={getDocument}>
        Get doc
      </button>
      <button
        className='bg-slate-600 text-white text-2xl font-bold py-2 px-5 m-3 rounded-lg'
        onClick={getDocWithQuery}>
        Get Documents
      </button>
      <button
        className='bg-slate-600 text-white text-2xl font-bold py-2 px-5 m-3 rounded-lg'
        onClick={updateDocument}>
        update document
      </button>
    </div>
  );
};

export default FirestorePage;
