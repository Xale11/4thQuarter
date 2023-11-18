import React, { useEffect, useRef, useState } from 'react'
import "./Gallery.css"
import lb1 from "../img/lb1.png"
import logo from "../img/logo.png"
import edit1 from "../img/edit1.png"
import {BiSolidCart, BiLogoTiktok} from "react-icons/bi"
import {AiFillInstagram} from "react-icons/ai"
import {IoMail} from "react-icons/io5"
import { uploadContactInfo, uploadGalleryPhotos } from '../firebase/firebase'
import { styled, keyframes } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Cart from './Cart'
import { useStateContext } from '../context/context'
import { FiMenu } from 'react-icons/fi'
import Menu from './Menu'




const Gallery = () => {

    const navigate = useNavigate()

    const {setShowCart, showCart, cart, amount, showMenu, setShowMenu} = useStateContext()

    const [photos, setPhotos] = useState()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [info, setInfo] = useState()

    const fetchContactInfo = async () => {
        let data = await uploadContactInfo()
        return setInfo(data)
    }

    const nextImage = () => {
        if (currentIndex == photos?.length - 1){
            setCurrentIndex(0)
        }
        else {
            setCurrentIndex((state) => (state + 1))
        }
    }

    const fetchGalleryPhotos = async () => {
        let data = await uploadGalleryPhotos()
        return setPhotos([...data])
    }

    useEffect(() => {
        fetchGalleryPhotos()
        fetchContactInfo()
    }, [])

    useEffect(() => {
        const interval = setInterval(nextImage, 3000);
        return () => clearInterval(interval);
      }, [currentIndex]);

      console.log(photos)

  return (
    <div className='gallery'>
        {showMenu && <div className="cartAbsolute">
          <Menu/>
        </div>}
        {showCart && <div className="cartAbsolute">
          <Cart/>
        </div>}
        <div className="cartIcon galleryBlack" onClick={() => setShowCart(true)}>
            <BiSolidCart/>
            {cart?.length > 0 && <div>{amount}</div>}
        </div>
        <div className="menuIcon galleryBlack" onClick={() => setShowMenu(true)}>
            <FiMenu/>
        </div>
        <img src={logo} alt="" className='logoIcon' onClick={() => navigate("/")}/>
        <div className="navItems galleryBlack" >
          <div className="navItem" onClick={() => navigate("/")}>Home</div>
          <div className="navItem" onClick={() => navigate("/shop")}>Shop</div>
          <div className="navItem" onClick={() => navigate("/gallery")} style={{color: "var(--red)"}}>Gallery</div>
          <div className="navItem" onClick={() => navigate("/brand")}>Our Vision</div>
          <div className="navItem" onClick={() => navigate("/contact")}>Contact</div>
          <div className="navItem" onClick={() => navigate("/policies")}>Policies</div>
        </div>
        <div className="socialsList galleryBlack">
          <AiFillInstagram onClick={() => {window.open(`${info?.insta?.link}`)}}/>
          <BiLogoTiktok onClick={() => {window.open(`${info?.tiktok?.link}`)}}/>
          <IoMail onClick={() => navigate("/contact")}/>
        </div>
        <div className="galleryContent">
            <div className="lookbook">
                <div className="lookbookImgs">
                    {photos?.map((photo) => {
                        return (
                            <div className='lookbookCard'>
                                <img src={photo.url} alt="" className='lookbookImg'/>
                                <a href={`${photo.link}`}>Photos by: @Tobi Taiwo</a>
                            </div>
                        )
                    })}
                </div>
                {/* <div className="lookbookCredit">
                    <div>Photos by Tobi Taiwo</div>
                    <AiFillInstagram/>
                </div>
                <div className="lookbookExtras">SEE MORE</div> */}
            </div>
            <div className="lookbookSlidehow">
                    {photos?.map((photo, i) => {
                        return (
                            <div className={`lookbookSlideCard ${i == currentIndex ? "active" : ""}`} >
                                <img src={photo.url} alt="" className="lookbookSlideImg"/>
                                <div className="editCredit">
                                    <a href="">Photos by: @Tobi Taiwo</a>
                                </div> 
                            </div>
                    )})}
            </div>
        </div>
    </div>
  )
}

export default Gallery