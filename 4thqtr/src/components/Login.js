import React, { useEffect, useState } from 'react'
import {BiSolidCart, BiLogoTiktok} from "react-icons/bi"
import {AiFillInstagram} from "react-icons/ai"
import {IoMail} from "react-icons/io5"
import logo from "../img/logo.png"
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import { uploadContactInfo, uploadPromoClothes } from '../firebase/firebase'
import Cart from './Cart'
import { useStateContext } from '../context/context'

const Login = () => {

    const {showCart, setShowCart, cart, setCart, amount} = useStateContext()

    const navigate = useNavigate()

    const [info, setInfo] = useState()

    const fetchContactInfo = async () => {
        let data = await uploadContactInfo()
        return setInfo(data)
    }

    useEffect(() => {
        fetchContactInfo()
    }, [])

  return (
    <div className='login'>
        {showCart && <div className="cartAbsolute">
          <Cart/>
        </div>}
        <div className="cartIcon" onClick={() => setShowCart(true)}>
            <BiSolidCart/>
            {cart?.length > 0 && <div>{amount}</div>}
        </div>
        <img src={logo} alt="" className='logoIcon' onClick={() => navigate("/")}/>
        <div className="navItems black">
          <div className="navItem" onClick={() => navigate("/")}>Home</div>
          <div className="navItem" onClick={() => navigate("/shop")}>Shop</div>
          <div className="navItem" onClick={() => navigate("/gallery")}>Gallery</div>
          <div className="navItem" onClick={() => navigate("/brand")}>The Brand</div>
          <div className="navItem" onClick={() => navigate("/contact")}>Contact</div>
          <div className="navItem" onClick={() => navigate("/policies")}>Policies</div>
          <div className="navItem" onClick={() => navigate("/login")}>Login</div>
        </div>
        <div className="socialsList">
          <AiFillInstagram onClick={() => {window.open(`${info?.insta?.link}`)}}/>
          <BiLogoTiktok onClick={() => {window.open(`${info?.tiktok?.link}`)}}/>
          <IoMail onClick={() => navigate("/contact")}/>
        </div>
        <div className="loginContainer">
            <form className="form login">
                <div className="formTitle">Log in</div>
                <div className="inputSection">
                    <div className='loginDets'>Email:</div>
                    <input type="text" />
                </div>
                <div className="inputSection">
                    <div className='loginDets'>Password:</div>
                    <input type="text" />
                </div>
                <button>Login</button>
            </form>
            <form className="form signup">
            <div className="formTitle">Sign Up</div>
                <div className="inputSection">
                    <div className='loginDets'>Email:</div>
                    <input type="text" />
                </div>
                <div className="inputSection">
                    <div className='loginDets'>Password:</div>
                    <input type="text" />
                </div>
                <div className="inputSection">
                    <div className='loginDets'>Password:</div>
                    <input type="text" />
                </div>
                <button>Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default Login