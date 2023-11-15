import { useEffect, useState } from 'react'
import {useDispatch} from "react-redux"
import authService from './appwrite/auth'
import './App.css'
import {login, logout} from "./store/authSlice"
import {Header, Footer} from "./components/index"
import {Outlet} from "react-router-dom"

function App() {
const [loading, setLoading] = useState(true);
const dispatch = useDispatch();

useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{
   if(userData){
    dispatch(login({userData}))
   }
   else{
    dispatch(logout())
   }
  })
  .finally(()=> setLoading(false))

  // finally always run at the end doesn't matter if response is resolved or rejected 
}, [])

  return !loading? (
    <div className=' min-h-screen flex flex-wrap content-between bg-gray-400 '>
     <div className='  w-full block'>
      <Header />
      <main>
      TODO:  <Outlet />
      </main>
      <Footer />
     </div>
    </div>
  ) : null
}

export default App
