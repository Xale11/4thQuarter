import React, { useEffect, useState } from 'react'
import {BiSolidCart, BiLogoTiktok} from "react-icons/bi"
import {AiFillInstagram} from "react-icons/ai"
import {IoMail} from "react-icons/io5"
import logo from "../img/logo.png"
import img from "../img/shop.png"
import { useNavigate, useParams } from 'react-router-dom'
import "./ContactUs.css"
import Credits from './Credits'
import { useStateContext } from '../context/context'
import Cart from './Cart'
import { uploadContactInfo } from '../firebase/firebase'
import { FiMenu } from 'react-icons/fi'
import Menu from './Menu'

const ContactUs = () => {

    const navigate = useNavigate()

    const {setShowCart, showCart, cart, amount, showMenu, setShowMenu} = useStateContext()

    const [info, setInfo] = useState()

    const fetchContactInfo = async () => {
        let data = await uploadContactInfo()
        return setInfo(data)
    }

    useEffect(() => {
        fetchContactInfo()
    }, [])

  return (
    <div className='contactUs'>
        {showMenu && <div className="cartAbsolute">
          <Menu/>
        </div>}
        {showCart && <div className="cartAbsolute">
          <Cart/>
        </div>}
        <div className="cartIcon" onClick={() => setShowCart(true)}>
            <BiSolidCart/>
            {cart?.length > 0 && <div>{amount}</div>}
        </div>
        <div className="menuIcon" onClick={() => setShowMenu(true)}>
            <FiMenu/>
        </div>
            <img src={logo} alt="" className='logoIcon' onClick={() => navigate("/")}/>
            <div className="navItems black">
            <div className="navItem" onClick={() => navigate("/")}>Home</div>
            <div className="navItem" onClick={() => navigate("/shop")}>Shop</div>
            <div className="navItem" onClick={() => navigate("/gallery")}>Gallery</div>
            <div className="navItem" onClick={() => navigate("/brand")}>Our Vision</div>
            <div className="navItem" onClick={() => navigate("/contact")} style={{color: "var(--red)"}}>Contact</div>
            <div className="navItem" onClick={() => navigate("/policies")}>Policies</div>
        </div>
        <div className="socialsList">
          <AiFillInstagram onClick={() => {window.open(`${info?.insta?.link}`)}}/>
          <BiLogoTiktok onClick={() => {window.open(`${info?.tiktok?.link}`)}}/>
          <IoMail onClick={() => navigate("/contact")}/>
        </div>
        <form className="contactUsContainer" action={`https://formsubmit.co/${info?.email?.name}`} method="POST">
            <div className="contactUsInfo">
                <div className="contactUsBox">
                    <div>Enter Your Name:</div>
                    <input type="text" name="name"required />
                </div>
                <div className="contactUsBox">
                    <div>Enter Your Email:</div>
                    <input type="email" name='email' required />
                </div>
            </div>
            <div className="contactUsMsg">
            <div>Enter Your Message:</div>
                <textarea name="message" id="" cols="30" rows="10" required></textarea>
            </div>
            <button type='submit' className='contactUsSend'>Send</button>
        </form>
        <Credits/>
    </div>
  )
}

export default ContactUs