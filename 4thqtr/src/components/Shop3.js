import React, { useEffect, useState } from 'react'
import img from "../img/shop.png"
import {BiSolidCart, BiLogoTiktok} from "react-icons/bi"
import { FiMenu } from "react-icons/fi"
import {AiFillInstagram} from "react-icons/ai"
import {IoMail} from "react-icons/io5"
import logo from "../img/logo.png"
import "./Shop3.css"
import { useNavigate } from 'react-router-dom'
import Credits from './Credits'
import { uploadContactInfo, uploadPromoClothes } from '../firebase/firebase'
import Item from './Item'
import Cart from './Cart'
import { useStateContext } from '../context/context'
import Menu from './Menu'

const Shop3 = () => {

    const {showCart, setShowCart, cart, setCart, amount, showMenu, setShowMenu} = useStateContext()

    const navigate = useNavigate()
    const [clothes, setClothes] = useState()
    const [test, setTest] = useState(false)

    const [info, setInfo] = useState()

    const fetchContactInfo = async () => {
        let data = await uploadContactInfo()
        return setInfo(data)
    }

    const fetchPromoData = async () => {
        let data = await uploadPromoClothes()
        return setClothes([...data])
    }

    useEffect(() => {
        fetchPromoData()
        fetchContactInfo()
    }, [])

    console.log(101, clothes)

  return (
    <div className='shop'>
        {showCart && <div className="cartAbsolute">
          <Cart/>
        </div>}
        {showMenu && <div className="cartAbsolute">
          <Menu/>
        </div>}
        <div className="menuIcon" onClick={() => setShowMenu(true)}>
            <FiMenu/>
        </div>
        <div className="cartIcon" onClick={() => setShowCart(true)}>
            <BiSolidCart/>
            {cart?.length > 0 && <div>{amount}</div>}
        </div>
        <img src={logo} alt="" className='logoIcon mbShopHide' onClick={() => navigate("/")}/>
        <div className="navItems black">
          {/* <div className="navItem" onClick={() => navigate("/")}>Home</div> */}
          <div className="navItem" onClick={() => navigate("/shop")} style={{color: "var(--red)"}}>Shop</div>
          <div className="navItem" onClick={() => navigate("/gallery")}>Gallery</div>
          <div className="navItem" onClick={() => navigate("/brand")}>Our Vision</div>
          <div className="navItem" onClick={() => navigate("/contact")}>Contact</div>
          <div className="navItem" onClick={() => navigate("/policies")}>Policies</div>
        </div>
        <div className="socialsList">
          <AiFillInstagram onClick={() => {window.open(`${info?.insta?.link}`)}}/>
          <BiLogoTiktok onClick={() => {window.open(`${info?.tiktok?.link}`)}}/>
          <IoMail onClick={() => navigate("/contact")}/>
        </div>
        <div className="shopContent">
            <div className="shopCards">
                {clothes?.map((item) => {
                    let img1 = item?.img[0].url
                    return(
                        <Item item={item}></Item>
                    )
                })}
            </div>
        </div>
        
        <div className="mobileShopPage">
            <div className="mobileNav">
                <div className="mobileNavItem">
                    <div className="mbMenuIcon" onClick={() => setShowMenu(true)}>
                        <FiMenu/>
                    </div>
                    <img src={logo} alt="" className='mbLogoIcon' onClick={() => navigate("/")}/>
                    <div className="mbCartIcon" onClick={() => setShowCart(true)}>
                            <BiSolidCart/>
                            {cart?.length > 0 && <div>{amount}</div>}
                    </div>
                </div>
                <div className="mobileNavSocials">
                    <AiFillInstagram onClick={() => {window.open(`${info?.insta?.link}`)}}/>
                    <BiLogoTiktok onClick={() => {window.open(`${info?.tiktok?.link}`)}}/>
                    <IoMail onClick={() => navigate("/contact")}/>
                </div>
            </div>
            <div className="mobileShopCards">
                {clothes?.map((item) => {
                    let img1 = item?.img[0].url
                    return(
                        <div className="mobileShopCard" onClick={() => navigate(`/shop/${item.id}`)}>
                            <div className="mobileShopImg">
                                <img src={img1} alt="" />
                            </div>
                            <div className="mobileScTitle">{item.name}</div>
                            <div className="mobileScTitle">{item.colour}</div>
                            <div className="mobileScTitle price">£{item.defaultPrice}</div>
                        </div>
                    )
                })}
            </div>
            <Credits/>
        </div>
    </div>
  )
}

export default Shop3