import {FaGoogle} from "react-icons/fa";
import  {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import { app } from "../fireBase";

 const handleGoogleClick  = async() =>{
  
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
    console.log(result)
  }
  catch(e){
    console.log(e.message)
  }

}

export const OAuth = () => (
  <button type = "button" onClick = {handleGoogleClick} className='flex items-center gap-4 bg-red-500 rounded-xl p-3 text-center justify-center text-white hover:opacity-75' >
  <FaGoogle/> Continue with Google
  </button>
)


