import React from 'react'
import "./Sidebar.scss"
import { Link } from "react-router-dom"
import add_product_icon from "../../assets/Product_Cart.svg"
import list_product_icon from "../../assets/Product_list_icon.svg"
import Admin_user_icon from "../../assets/Admin_user_icon.png"

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={"/addproduct"} style={{textDecoration: "none"}}>
        <div className="sidebar-item">
            <img src={add_product_icon} alt="" />
            <p>Add Product</p>
        </div>
      </Link>

      <Link to={"/listproduct"} style={{textDecoration: "none"}}>
        <div className="sidebar-item">
            <img src={list_product_icon} alt="" />
            <p>Product List</p>
        </div>
      </Link>

      <Link to={"/userslist"} style={{textDecoration: "none"}}>
        <div className="sidebar-item">
            <img className="Admin_user_icon" src={Admin_user_icon} alt="" />
            <p>Users List</p>
        </div>
      </Link>
    </div>
  )
}
import "./Sidebar.scss"

export default Sidebar
