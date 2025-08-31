import { useContext } from 'react'
import { Route, Routes, useLocation, Navigate, useParams } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Nav from './component/Nav'
import { userDataContext } from './context/UserContext'
import About from './pages/About'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import Cart from './pages/Cart'
import {ToastContainer,toast} from 'react-toastify'
import Ai from './component/Ai'
function App() {
  const { userData } = useContext(userDataContext)
  const location = useLocation()
  const { id } = useParams()

  return (
    <>
    <ToastContainer/>
      {userData && <Nav />}
      <Routes>
        <Route
          path="/login"
          element={
            userData ? <Navigate to={location.state?.from || "/"} /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            userData ? <Navigate to={location.state?.from || "/"} /> : <Register />
          }
        />
        <Route
          path="/"
          element={
            userData ? <Home /> : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />
        <Route
          path="/about"
          element={
            userData ? <About /> : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />
        <Route
          path="/collection"
          element={
            userData ? <Collection /> : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />
        <Route
          path="/product"
          element={
            userData ? <Product /> : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />
        <Route
          path="/contact"
          element={
            userData ? <Contact /> : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />
        <Route
          path="/productdetail/:productId"
          element={
            userData ? <ProductDetail /> : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />
        <Route
          path="/cart"
          element={
            userData ? <Cart /> : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />
        <Route
          path="/placeorder"
          element={
            userData ? <PlaceOrder /> : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />
        <Route
          path="/order"
          element={
            userData ? <Order /> : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />
      </Routes>
      <Ai/>
    </>
  )
}

export default App
