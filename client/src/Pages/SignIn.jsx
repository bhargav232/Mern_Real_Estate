import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { OAuth } from "../components/OAuth";
//import { signInFailure, signInStart, signInSucess } from "../redux/user/userSlice";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';


export default function SignIn() {
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleonChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleOnSubmit = async(e)=>{
    e.preventDefault()
    try{
   dispatch(signInStart())
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data)
    if(data.success == false){
     dispatch(signInFailure(data.msg))
      return;
    }
   dispatch(signInSuccess(data))
    navigate("/")
  } catch(e){
   dispatch(signInFailure(e.message))
    console.log(error)
  }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-bold my-7">
        Sign In
      </h1>
     
      <form className="flex flex-col gap-4 "onSubmit={handleOnSubmit}>
         <input type="email" placeholder="Email" id="email" className="p-3
        rounded-lg" onChange={handleonChange}/>
         <input type="password" placeholder="Password" id="password" className="p-3 
         rounded-lg" onChange={handleonChange}/>
        <button disabled ={loading} className="bg-blue-500 rounded-lg p-3 text-white hover:opacity-60">{loading? "loading...":"Sign In"}</button>
        <OAuth/>      
        </form>
    
      
      <div className=" flex gap-2 mt-4 ">
       <p className="font-semibold">Dont have an account ?</p>
       <Link to ={"/sign-up"}>
        <span className="text-blue-900 font-semibold">Sign up</span>
        </Link> 
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}