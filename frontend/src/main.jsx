import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import './index.css'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'

// Pages
import Register from './pages/Auth/Register.jsx'
import Login from './pages/Auth/Login.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Users/Profile.jsx'
import Users from './pages/Admin/Users.jsx'
import Categories from './pages/Admin/Categories.jsx'
import Products from './pages/Admin/Products.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Order/Checkout.jsx'
import Orders from './pages/Admin/Orders.jsx'
import OrderDetails from './pages/Order/OrderDetails.jsx'
import ContactUs from './pages/ContactUs.jsx'
import Shop from './pages/Shop.jsx'

// Components
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route index={true} path='/' element={<Home />} ></Route>
      <Route path='/product/:id' element={<ProductDetails />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      <Route path='/checkout' element={<Checkout />}></Route>
      <Route path='/contactus' element={<ContactUs />}></Route>
      <Route path='/shop' element={<Shop />}></Route>

      {/* Private Routes */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile/:id' element={<Profile />}></Route>
      </Route>

      {/* Admin Routes */}
      <Route path='/admin' element={<AdminRoute />}>
        <Route path='/admin/users' element={<Users />}></Route>
        <Route path='/admin/categories' element={<Categories />}></Route>
        <Route path='/admin/products' element={<Products />}></Route>
        <Route path='/admin/orders' element={<Orders />}></Route>
        <Route path='/admin/orders/:id' element={<OrderDetails />}></Route>
      </Route>
    </Route>
  ))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)