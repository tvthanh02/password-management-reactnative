## mẫu

import { collection, doc, setDoc } from "firebase/firestore";

const citiesRef = collection(db, "cities");

await setDoc(doc(citiesRef, "SF"), {
name: "San Francisco", state: "CA", country: "USA",
capital: false, population: 860000,
regions: ["west_coast", "norcal"] });
await setDoc(doc(citiesRef, "LA"), {
name: "Los Angeles", state: "CA", country: "USA",
capital: false, population: 3900000,
regions: ["west_coast", "socal"] });
await setDoc(doc(citiesRef, "DC"), {
name: "Washington, D.C.", state: null, country: "USA",
capital: true, population: 680000,
regions: ["east_coast"] });
await setDoc(doc(citiesRef, "TOK"), {
name: "Tokyo", state: null, country: "Japan",
capital: true, population: 9000000,
regions: ["kanto", "honshu"] });
await setDoc(doc(citiesRef, "BJ"), {
name: "Beijing", state: null, country: "China",
capital: true, population: 21500000,
regions: ["jingjinji", "hebei"] });

## get a document

import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "cities", "SF");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
console.log("Document data:", docSnap.data());
} else {
// docSnap.data() will be undefined in this case
console.log("No such document!");
}

## Get multiple documents from a collection

import { collection, query, where, getDocs } from "firebase/firestore";

const q = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
// doc.data() is never undefined for query doc snapshots
console.log(doc.id, " => ", doc.data());
});

## Get all documents in a collection

import { collection, getDocs } from "firebase/firestore";

const querySnapshot = await getDocs(collection(db, "cities"));
querySnapshot.forEach((doc) => {
// doc.data() is never undefined for query doc snapshots
console.log(doc.id, " => ", doc.data());
});

## set a document

import { doc, setDoc } from "firebase/firestore";

// Add a new document in collection "cities"
await setDoc(doc(db, "cities", "LA"), {
name: "Los Angeles",
state: "CA",
country: "USA"
});

## add document with set()

import { doc, setDoc } from "firebase/firestore";

await setDoc(doc(db, "cities", "new-city-id"), data);

## add document not need rowid

import { collection, addDoc } from "firebase/firestore";

// Add a new document with a generated id.
const docRef = await addDoc(collection(db, "cities"), {
name: "Tokyo",
country: "Japan"
});
console.log("Document written with ID: ", docRef.id);

## update document

import { doc, updateDoc } from "firebase/firestore";

const washingtonRef = doc(db, "cities", "DC");

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
capital: true
});

## delete document

import { doc, deleteDoc } from "firebase/firestore";

await deleteDoc(doc(db, "cities", "DC"));
