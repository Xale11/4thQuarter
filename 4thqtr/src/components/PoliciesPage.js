import React, { useEffect, useState } from 'react'
import "./PoliciesPage.css"
import {BiSolidCart, BiLogoTiktok} from "react-icons/bi"
import {AiFillInstagram} from "react-icons/ai"
import {IoMail} from "react-icons/io5"
import logo from "../img/logo.png"
import img from "../img/shop.png"
import { useNavigate, useParams } from 'react-router-dom'
import { uploadContactInfo, uploadPolicy } from '../firebase/firebase'
import { useStateContext } from '../context/context'
import Cart from './Cart'
import { FiMenu } from 'react-icons/fi'
import Menu from './Menu'

const PoliciesPage = () => {

    const navigate = useNavigate()

    const {showCart, setShowCart, cart, amount, showMenu, setShowMenu} = useStateContext()

    const [policy, setPolicy] = useState()
    const [info, setInfo] = useState()

    const fetchContactInfo = async () => {
        let data = await uploadContactInfo()
        return setInfo(data)
    }

    const fetchPolicy = async () => {
        let data = await uploadPolicy()
        return setPolicy(data.policy.text)
    }

    useEffect(() => {
        fetchPolicy()
        fetchContactInfo()
    }, [])

    console.log(policy)

  return (
    <div className='policiesPage'>
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
            <div className="navItem" onClick={() => navigate("/contact")}>Contact</div>
            <div className="navItem" onClick={() => navigate("/policies")} style={{color: "var(--red)"}}>Policies</div>
        </div>
        <div className="socialsList">
          <AiFillInstagram onClick={() => {window.open(`${info?.insta?.link}`)}}/>
          <BiLogoTiktok onClick={() => {window.open(`${info?.tiktok?.link}`)}}/>
          <IoMail onClick={() => navigate("/contact")}/>
        </div>
        <div className="policiesPageContainer">
            <div className="policyInfo">
                {policy?.map((text) => {
                    return (
                        <div>{text}</div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default PoliciesPage