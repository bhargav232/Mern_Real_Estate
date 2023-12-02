import {useSelector} from "react-redux"
import { useRef, useState, useEffect} from "react"
import {getStorage, uploadBytesResumable, ref, getDownloadURL} from "firebase/storage"
import {app} from "../fireBase"

export default function Profile() {
const{currentUser} = useSelector(state => state.user)
const fileRef = useRef(null)
const[file, setFile] = useState(undefined) // for image
const[fileper, setFilePer] = useState(0);
const[fileUploadError, setFileUploadError] = useState(false);
const[formData, setFormData] = useState({})
console.log(fileper)
console.log(formData)

const handleonChange = (e) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value,
  });
};


useEffect(()=>{
   if(file){
  handleFileUpload(file)
  }
}, [file])

const handleFileUpload = (file) => {
  const storage  = getStorage(app);
  const fileName = new Date ().getTime() + file.name // for uniquness
  const storageRef = ref(storage, fileName)
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
      
      <form className="flex flex-col gap-4" >
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
        <input type="text" placeholder="username"  id="username" className="p-3 border rounded-lg "onChange={handleonChange}/>
       
        <input type="text" placeholder="email" id="email" className="p-3 border rounded-lg"onChange={handleonChange}/>
       
        <input type="text" placeholder="password" id="password" className="p-3 border rounded-lg"onChange={handleonChange}/>
       
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