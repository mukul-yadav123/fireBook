import {createContext, useContext, useState, useEffect} from 'react'
import {initializeApp} from 'firebase/app'
import {
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth'
import {getFirestore, collection, addDoc, getDocs,getDoc,doc,query,where} from 'firebase/firestore'
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'

const FireContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyC5HB0RJs1wDbT8SjswJwPnijvGubYTM4U",
    authDomain: "firebook-d8054.firebaseapp.com",
    projectId: "firebook-d8054",
    storageBucket: "firebook-d8054.appspot.com",
    messagingSenderId: "361233293345",
    appId: "1:361233293345:web:16b344bef755b4d9dfc360"
  };

export const useFire = () => useContext(FireContext);

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp)
const fireStore = getFirestore(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const FireBaseProvider = ({children}) => {
  
  const[user,setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, user => {
      if(user) setUser(user);
      else setUser(null);
    })
  },[]);

  
  const signupUserWithEmailAndPassword = (email,password) => createUserWithEmailAndPassword(firebaseAuth,email,password);
  
  const signinUserWithEmailAndPassword = (email,password) => (
    signInWithEmailAndPassword(firebaseAuth,email,password)
    )
    
    const signinWithGoogle = () => signInWithPopup(firebaseAuth,googleProvider);
    const isLoggedIn = user ? true : false;
    
    // console.log(user)
    const handleCreateNewListing = async(name,isbnNumber,price,coverPic) => 
    {
      const imageRef = ref(storage,`uploads/images/${Date.now()}-${coverPic.name}`);
      const uploadResult = await uploadBytes(imageRef,coverPic);
      return await addDoc(collection(fireStore,"books"),{ 
        name,
        isbnNumber,
        price,
        imageURL: uploadResult.ref.fullPath,
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL
      });
      
    }
    
    const getImgURL = (path) => getDownloadURL(ref(storage,path))
    
    const listAllBooks = () => {
      return getDocs(collection(fireStore,'books'));
    }
    
    const getBookById = async(id) =>{
      const docRef = doc(fireStore,'books',id);
      const result = await getDoc(docRef);
      return result;
    }
    
    const placeOrder = async(bookId,quantity) => 
    {
      const collectionRef = collection(fireStore,'books',bookId,'order');
      const result = await addDoc(collectionRef,{
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL,
        quantity
      });
      return result;
    };
    
    const fetchMyBooks = async(userId) =>
    {
    const collectionRef = collection(fireStore,'books');
    const q = query(collectionRef, where('userID','==',userId));

    const result = await getDocs(q);
    return result;
    
  }

  const getOrders = async(bookId) => {
    const collectionRef = collection(fireStore,'books',bookId,'order');
    const result = await getDocs(collectionRef);

    return result;
  }

  return (
    <FireContext.Provider value={{getOrders,user,fetchMyBooks,placeOrder,getBookById,getImgURL,listAllBooks,handleCreateNewListing,signupUserWithEmailAndPassword,signinUserWithEmailAndPassword,signinWithGoogle,isLoggedIn}}>
        {children}
    </FireContext.Provider>
  )
}

export default FireBaseProvider;