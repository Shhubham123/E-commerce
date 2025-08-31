import { useState ,useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Route,Routes,useLocation} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Order from './pages/Order'
import List from './pages/List'
import Add from './pages/Add'
import { adminDataContext } from './context/AdminContext'
// import {ToastContainer,toast} from 'react-toastify'


// import useContext from 'useContext'


function App() {
  let {adminData} = useContext(adminDataContext)
  
  return (
    <>
    {/* <ToastContainer/> */}
{
    !adminData ? <Login/> :<>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/add' element={<Add/>} />
    <Route path='/list' element={<List/>} />
    <Route path='/order' element={<Order/>} />
    <Route path='/login' element={<Login/>} />

  </Routes>
  </>
}
</>
  )
}

export default App
