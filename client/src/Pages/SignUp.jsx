import {Link} from "react-router-dom";
export default function SignUP() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-bold my-7">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" id="Username" className="p-3
        rounded-lg"/>
         <input type="email" placeholder="Email" id="Email" className="p-3
        rounded-lg"/>
         <input type="password" placeholder="Password" id="Password" className="p-3 rounded-lg"/>
        <button className="bg-blue-500 rounded-lg p-3 text-white hover:opacity-60">Sign Up</button>
      </form>
      <div className=" flex gap-2 mt-4">
       <p>Have an account ?</p>
       <Link to ={"/sign-in"}>
        <span className="text-blue-400">Sign in</span>
        </Link> 
      </div>
    </div>
  )
}
