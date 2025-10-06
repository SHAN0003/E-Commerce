import React, { useContext, useState } from 'react'
import "./Navbar.scss"
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {

    const [menu, setMenu] = useState("SHOP");
    const {getTotalCartItems} = useContext(ShopContext);
    

  return (
    <>
    <nav>
        <div className="logo">
            <img src={logo} alt="" />
            <p>SHOPEZY</p>
        </div>

        <div className="menu">
            <ul>
                <li  onClick={() => {setMenu("SHOP")}}><Link style={{textDecoration: "none", color: "black"}} to="/">SHOP</Link>{menu==="SHOP"?<hr/>:<></>}</li>
                <li  onClick={() => {setMenu("MEN")}}><Link style={{textDecoration: "none", color: "black"}} to="/mens">MEN</Link>{menu==="MEN"?<hr/>:<></>}</li>
                <li  onClick={() => {setMenu("WOMEN")}}><Link style={{textDecoration: "none", color: "black"}} to="/womens">WOMEN</Link>{menu==="WOMEN"?<hr/>:<></>}</li>
                <li  onClick={() => {setMenu("KIDS")}}><Link style={{textDecoration: "none", color: "black"}} to="/kids">KIDS</Link>{menu==="KIDS"?<hr/>:<></>}</li>
            </ul>
        </div>
        
        {/* <div className="mobile-menu">&#9776;
            <ul>
                <li  onClick={() => {setMenu("SHOP")}}><Link style={{textDecoration: "none", color: "black"}} to="/">SHOP</Link>{menu==="SHOP"?<hr/>:<></>}</li>
                <li  onClick={() => {setMenu("MEN")}}><Link style={{textDecoration: "none", color: "black"}} to="/mens">MEN</Link>{menu==="MEN"?<hr/>:<></>}</li>
                <li  onClick={() => {setMenu("WOMEN")}}><Link style={{textDecoration: "none", color: "black"}} to="/womens">WOMEN</Link>{menu==="WOMEN"?<hr/>:<></>}</li>
                <li  onClick={() => {setMenu("KIDS")}}><Link style={{textDecoration: "none", color: "black"}} to="/kids">KIDS</Link>{menu==="KIDS"?<hr/>:<></>}</li>
            </ul>
        </div> */}


        <div className="login-cart_icon">
            {localStorage.getItem("auth-token") ? <button style={{color: "red", opacity: "0.9"}} onClick={()=>{localStorage.removeItem("auth-token"); window.location.replace("/")}}>Log out</button> : <Link to="/login"><button>Login</button></Link>}
        <Link to="/cart"><img src={cart_icon} alt="" /></Link>
            <div className="counter">{getTotalCartItems()}</div>
        </div>
    </nav>
    </>
  )
}

export default Navbar
