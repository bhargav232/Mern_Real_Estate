import {useSelector} from "react-redux"
import { useRef, useState, useEffect} from "react"
import {getStorage, uploadBytesResumable, ref, getDownloadURL} from "firebase/storage"
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } from "../redux/user/userSlice"
import {app} from "../fireBase"
import { useDispatch } from "react-redux"
export default function Profile() {

const{currentUser, loading, error} = useSelector(state => state.user)
const fileRef = useRef(null)
const[file, setFile] = useState(undefined) // for image
const[fileper, setFilePer] = useState(0);
const[fileUploadError, setFileUploadError] = useState(false);
const[formData, setFormData] = useState({})
const[updateSucess, setupdateSucess] = useState(false);
const dispatch = useDispatch();

console.log(fileper)
console.log(formData)

//console.log(loading)
//console.log(error)

useEffect(() => {
  if (file) {
    handleFileUpload(file);
  }
}, [file]);


const handleFileUpload = (file) => {
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePer(Math.round(progress));
    },
    (error) => {
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        setFormData({ ...formData, avatar: downloadURL })
      );
    }
  );
};

//onsole.log(formData)

const handleonChange = (e) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value,
  });
};
  

const  handleSubmit = async(e)=>{
  e.preventDefault();
  try{
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //send update data to backend using post method!
      body: JSON.stringify(formData),
    })
    // converting to json format
    const data = await res.json();
    console.log(data)
    console.log(data.msg)

    if(data.success === false){
     dispatch(updateUserFailure(data.msg))
     console.log(data.message)
      return;
    }
    dispatch(updateUserSuccess(data))
    setupdateSucess(true)
  }
  catch(e)
  {
    dispatch(updateUserFailure(e.message))
  }

}

 const handleDeleteUser = async(e)=>{
  e.preventDefault();
  try{
    dispatch(deleteUserStart())
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
      method: 'DELETE',
    })
    const data = await res.json();
    if(data.success === false)
    {
      dispatch(deleteUserFailure())
      return;
    }
    dispatch(deleteUserSuccess())
  }
  catch(e)
  {
    dispatch(deleteUserFailure(e.message))

  }

 }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>
    
      <input onChange = {(e)=>{setFile(e.target.files[0])}}
      type = "file" 
      ref={fileRef} 
      hidden 
      accept="images/*" 
      />
      
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        {/* <spam className = "text-red-500 text-xs text-center">{fileper}</spam> */}
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : fileper > 0 && fileper < 100 ? (
            <span className='text-slate-700'>{`Uploading ${fileper}%`}</span>
          ) : fileper === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input type="text" placeholder="username" 
         id="username" 
         defaultValue={currentUser.username}
         className="p-3 border rounded-lg
         "onChange={handleonChange}/>
       
        <input type="text" defaultValue={currentUser.email}
         placeholder="email" id="email" 
         className="p-3 border rounded-lg"
         onChange={handleonChange}/>
       
        <input type="password" placeholder="password" 
        id="password" className="p-3 border rounded-lg"
        onChange={handleonChange}/>
       
        <button className="bg-blue-400 p-3 border rounded-lg uppercase hover:opacity-80 " disabled = {loading}>
          {loading? "Loading..." : "Update" }
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer font-semibold '
        >
          Delete account ?
        </span>
        <span 
        //onClick={handleSignOut}
         className='text-red-700 cursor-pointer font-semibold'>
          Sign out ?
        </span>
      </div>

      <p className='text-red-700 mt-5 font-semibold text-center'> {error ? `Error: ${error }`: ''}</p>
      <p className="text-red-700 mt-5 font-semibold text-center"> {updateSucess? "User Updated sucuessfully! ": ""}</p>
       
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