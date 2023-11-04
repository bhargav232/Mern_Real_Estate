import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { montrealDate } from "./time";
function Header() {
  return (
    <header className='bg-blue-100 shadow-md'>
     <div className='flex flex-wrap justify-between items-center max-w-6xl mx-auto p-3'>
      <Link to ="/">
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-gray-500 hover:text-black-700 mx-1'>Bhargav </span>
        <span className="text-black-700 hover:text-gray-500 ">Estate</span>
        </h1>
        <span className="text-sm text-black-700"> {montrealDate}</span>
        </Link>
        <form className='bg-slate-100 p-1 rounded-lg flex items-center'>
            <input type="text" placeholder='Search... ' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <FaSearch className="mx-2 text-slate-600"/>
        </form>
        <ul className="flex gap-4 text-center ">
            <Link to ="/">
            <li className="hidden sm:inline hover:cursor-pointer hover:underline hover:text-slate-500">Home</li>
            </Link>
            <Link to ="/about">
            <li className="hidden sm:inline  hover:cursor-pointer hover:underline hover:text-slate-500">About</li>
            </Link>
            <Link to ="/sign-in">
            <li className="hover: cursor-pointer  hover:underline  hover:text-slate-500">Sign in</li>
            </Link>
        </ul>
     </div>
    </header>
  )
}

export default Header