import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar';
import "./Admin.scss"
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import Users from '../../Components/Users/Users';

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/listproduct' element={<ListProduct />} />
        <Route path='/userslist' element={<Users />} />
      </Routes>
    </div>
  )
}

export default Admin;