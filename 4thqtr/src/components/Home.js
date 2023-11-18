import React, {useEffect, useState} from 'react'
import "./Home.css"
import img from "../img/test.png"
import logo from "../img/logo.png"
import {BiSolidCart, BiLogoTiktok} from "react-icons/bi"
import { FiMenu } from "react-icons/fi"
import {AiFillInstagram} from "react-icons/ai"
import {FaTiktok} from "react-icons/fa"
import {IoMail} from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import Credits from './Credits'
import { uploadContactInfo } from '../firebase/firebase'
import { useStateContext } from '../context/context'
import Cart from './Cart'
import Menu from './Menu'

const Home = () => {

  const navigate = useNavigate()

  const {showCart, setShowCart, cart, amount, setShowMenu, showMenu} = useStateContext()

  const [info, setInfo] = useState()

  const fetchContactInfo = async () => {
      let data = await uploadContactInfo()
      return setInfo(data)
  }

  useEffect(() => {
    fetchContactInfo()
  }, [])


  return (
    <div className='home'>
      {showCart && <div className="cartAbsolute">
          <Cart/>
        </div>}
        {showMenu && <div className="cartAbsolute">
          <Menu/>
        </div>}
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt=""/>
        </div>
        <div className="navItems">
          <div className="navItem" onClick={() => navigate("/")} >Home</div>
          <div className="navItem" onClick={() => navigate("/shop")}>Shop</div>
          <div className="navItem" onClick={() => navigate("/gallery")}>Gallery</div>
          <div className="navItem" onClick={() => navigate("/brand")}>Our Vision</div>
          <div className="navItem" onClick={() => navigate("/contact")}>Contact</div>
          <div className="navItem" onClick={() => navigate("/policies")}>Policies</div>
        </div>
        <div className="homeMenu" onClick={() => {setShowMenu(true)}}>
          <FiMenu/>
        </div>
        <div className="navbarSvg">
          <BiSolidCart className='cartLogo' onClick={() => setShowCart(true)}/>
          {cart?.length > 0 && <div>{amount}</div>}
        </div>
        
      </div>
      {/* <div className="keywords">DETERMINATION | FOCUS | CONSISTENCY</div> */}
      <div className='mainContent'>
        <img src={img} alt="" className='header'/>
        {/* <div className="slogan">Are You Ready To Take Your <span className='red'>Shot!</span></div> */}
        <div className="homeCtaBtn" onClick={() => navigate("/shop")}>SHOP NOW</div>
      </div>
      <div className="ctaContent">
        {/* <div className="homeCtaBtn">SHOP NOW!</div> */}
        <div className="socials">
          <AiFillInstagram onClick={() => {window.open(`${info?.insta?.link}`)}}/>
          <BiLogoTiktok onClick={() => {window.open(`${info?.tiktok?.link}`)}}/>
          <IoMail onClick={() => navigate("/contact")}/>
        </div>
      </div>
    </div>
  )
}

export default Home