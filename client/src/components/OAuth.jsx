import {FaGoogle} from "react-icons/fa";
import  {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import { app } from "../fireBase";
import  {useDispatch} from "react-redux"
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";



export const OAuth = () => {
  const dispatch = useDispatch();
  const navigate  = useNavigate()
 const handleGoogleClick  = async() =>{
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
    console.log(result)
    const res = await fetch("/api/auth/google", {

      method : "POST",
      headers: {
        "Content-Type" : "application/json"
      },

      body : JSON.stringify({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL
      }),

    });
    const data = await res.json()
    console.log(data)
    //console.log("bkm")
    dispatch(signInSuccess(data))
    navigate("/");
    }
  catch(e){
    console.log(e.message)
  }

}
  return(
  <button type = "button" onClick = {handleGoogleClick} className='flex items-center gap-4 bg-red-500 rounded-xl p-3 text-center justify-center text-white hover:opacity-75' >
  <FaGoogle/> Continue with Google
  </button>
  )
}


