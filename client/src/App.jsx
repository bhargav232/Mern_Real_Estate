import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignOut from './Pages/SignUp';
import Profile from './Pages/Profile';
import About from './Pages/About';
import Header from "./components/Header";

export default function App() {
  return <BrowserRouter>
  <Header/>
    <Routes>
      <Route path='/' element= {<Home/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-out' element={<SignOut/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/about' element={<About/>}/>
    </Routes>
    </BrowserRouter>
   
}
