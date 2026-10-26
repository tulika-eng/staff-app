import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5UGRh9C5YUmFh2ZtnbdXds_11u2DGfEs",
  authDomain: "staff-app-22f51.firebaseapp.com",
  projectId: "staff-app-22f51",
  storageBucket: "staff-app-22f51.firebasestorage.app",
  messagingSenderId: "226990173416",
  appId: "1:226990173416:web:a1d7a2b310130300dc6d5d",
  measurementId: "G-8PLP52D0EP"
};

const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})
export const auth = getAuth();

export async function signinWithgoogle() {
  return await signInWithPopup(auth, provider)
}

export async function creatinguserwithsignup(email, password) {

  if (!email || !password)
    return;
  return await createUserWithEmailAndPassword(auth, email, password)

}

export async function signinuser(email, password) {

  if (!email || !password)
    return;
  return await signInWithEmailAndPassword(auth, email, password)

}

export const db = getFirestore();
export async function creataUserdocfromauth(userAuth, addtionalInfo = {}) {
  const userDocRef = doc(db, 'AI-X1', userAuth.uid)
  console.log(userDocRef)
  const usersnapshot = await getDoc(userDocRef)
  console.log("usersnap", usersnapshot)
  console.log(usersnapshot.exists())
  if (!usersnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...addtionalInfo
      })
    }
    catch (error) {
      console.log("error in creating ", error.message);
    }
  }
}
export async function addcollectionanddocuments(collectionkey, objectstoadd) {

  const collectionRef = collection(db, collectionkey);
  const batch = writeBatch(db)
  objectstoadd.forEach((object) => {
    const docRef = doc(collectionRef, object.name.toLowerCase());
    batch.set(docRef, object)


  })
  await batch.commit();
  console.log("transaction is succesful")
}

export async function fetchstaffdata() {

  const collectionRef = collection(db, 'staff')
  const q = query(collectionRef)
  const querysnapshot = await getDocs(q)
  const staffmap = querysnapshot.docs.reduce((acc, docsnapshot) => {
    const data = docsnapshot.data();
    const docName = data.name || docsnapshot.id;
    acc[docName.toLowerCase()] = { name: docName, ...data };
    return acc;
  }, {}
  )
  return staffmap;
}