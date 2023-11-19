import {useSelector} from "react-redux"
import { useRef, useState } from "react"
export default function Profile() {
const{currentUser} = useSelector(state => state.user)
const fileRef = useRef(null)
const[file, setFile] = useState(undefined)

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>
      <input onChange ={(e)=>setFile(e.target.files[0])} 
      type = "file" 
      ref={fileRef } 
      hidden 
      accept="images/*" 
      />
      {console.log(file)}
      
      <form className="flex flex-col gap-4">
        <img src = {currentUser.avatar} alt = "profile" onClick ={()=>fileRef.current.click()}className= "self-center h-22 w-22 rounded-full object-cover cursor-pointer"/>
        <input type="text" placeholder="username"  id="username" className="p-3 border rounded-lg">
        </input>
        <input type="text" placeholder="email" id="email" className="p-3 border rounded-lg">
        </input>
        <input type="text" placeholder="password" id="password" className="p-3 border rounded-lg">
        </input>
        <button className="bg-blue-400 p-3 border rounded-lg uppercase hover:opacity-80">
          update
        </button>
      </form>
      <form className="mt-4">
       <div className="flex justify-between">
        <span className="text-red-800 cursor-pointer">
          Delete Account?
        </span>
        <span className="text-red-800 cursor-pointer">
          Sign Out?
        </span>
       </div>
      </form>
    </div>
  )
}



// Fire-base image upload rules
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write : if
//       request.resource.size < 2*1024*1024 && 
//       request.resource.contentType.matches("image/.*")
//     }
//   }
// }