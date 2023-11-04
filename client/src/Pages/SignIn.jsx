import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const[loading, setLoading] = useState(false)
  const[error, setError] = useState(null)
  const navigate = useNavigate();

  const handleonChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleOnSubmit = async(e)=>{
    e.preventDefault()
    try{
    setError(null)
    setLoading(true)
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
      setLoading(false)
      setError(data.msg)
      //console.log(error)
      return;
    }
    setLoading(false)
    navigate("/")
  } catch(e){
    setLoading(false)
    setError(e.message)
    console.log(error)
    //console.log("frontend error")
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
      </form>
      
      <div className=" flex gap-2 mt-4">
       <p>Dont have an account ?</p>
       <Link to ={"/sign-up"}>
        <span className="text-blue-400">Sign up</span>
        </Link> 
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
