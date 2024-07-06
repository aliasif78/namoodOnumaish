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

      {/* Private Routes */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile/:id' element={<Profile />}></Route>
      </Route>

      {/* Admin Routes */}
      <Route path='/admin' element={<AdminRoute />}>
        <Route path='/admin/users' element={<Users />}></Route>
        <Route path='/admin/categories' element={<Categories />}></Route>
        <Route path='/admin/products' element={<Products />}></Route>
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