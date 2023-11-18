import React, { useEffect, useState } from 'react'
import "./Brand.css"
import logo from "../img/logo.png"
import slide1 from "../img/slide1.png"
import {BiSolidCart, BiLogoTiktok} from "react-icons/bi"
import {AiFillInstagram} from "react-icons/ai"
import {IoMail} from "react-icons/io5"
import { uploadContactInfo, uploadSquadPhotos } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import Cart from './Cart'
import { useStateContext } from '../context/context'
import { FiMenu } from 'react-icons/fi'
import Menu from './Menu'

const Brand = () => {

    const navigate = useNavigate()

    const {showCart, setShowCart, cart, amount, showMenu, setShowMenu} = useStateContext()

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

    const fetchSquadPhotos = async () => {
        let data = await uploadSquadPhotos()
        return setPhotos([...data])
    }

    useEffect(() => {
        fetchSquadPhotos()
        fetchContactInfo()
    }, [])

    useEffect(() => {
        const interval = setInterval(nextImage, 3000);
        return () => clearInterval(interval);
      }, [currentIndex]);

    console.log(photos)

  return (
    <div className='brand'>
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
        <div className="navItems" style={{color: "var(--black)"}}>
          <div className="navItem" onClick={() => navigate("/")}>Home</div>
          <div className="navItem" onClick={() => navigate("/shop")}>Shop</div>
          <div className="navItem" onClick={() => navigate("/gallery")}>Gallery</div>
          <div className="navItem" onClick={() => navigate("/brand")} style={{color: "var(--red)"}}>Our Vision</div>
          <div className="navItem" onClick={() => navigate("/contact")}>Contact</div>
          <div className="navItem" onClick={() => navigate("/policies")}>Policies</div>
        </div>
        <div className="socialsList">
          <AiFillInstagram onClick={() => {window.open(`${info?.insta?.link}`)}}/>
          <BiLogoTiktok onClick={() => {window.open(`${info?.tiktok?.link}`)}}/>
          <IoMail onClick={() => navigate("/contact")}/>
        </div>
        <div className="brandContent">
            <div className="brandMsgContent">
                <div className="brandMsgSection">
                    <div className="brandMsgTitle">Our Beliefs:</div>
                    <div className="brandMsgWriting"><div>4TH QUARTER is built on the principle of performing under pressure. We believe that mentality is crucial aspect of the game, and aim to develop and promote a community that possess elite skill but also an elite mentality.</div></div>
                </div>
                <div className="brandMsgSection">
                    <div className="brandMsgTitle">Our Vision:</div>
                    <div className="brandMsgWriting"><div>Our vision is to be more than a clothing brand, we aim to develop alongside talented platers allowing us to build a stronger mindset over time.</div></div>
                </div>
                <div className="brandMsgSection">
                    <div className="brandMsgTitle">Our Values:</div>
                    <div className="brandMsgWriting"><div>Determination: Set a goal and stay locked in on the specific outcome that you want.</div><div>Focus: Concentration on the specific outcome that you want to see, there will be set backs but hold your self accountable for the things that you can control.</div><div>Consistency: The only way to achieve something worthwhile is slowly, the secret towards achieving any goal is consistently making steps towards the out you want, no excuses.</div></div>
                </div>
            </div>
            <div className="brandSlideshow">
                {/* <div className="brandSlideshowTitle">Meet some of the <span className='red'>squad</span></div>
                {photos?.map((photo, i) => {
                    return(
                        <img src={photo.url} alt="" className={`slideImg ${i == currentIndex ? "active" : ""}`}/>
                    )
                })} */}
            </div>
        </div>   
    </div>
  )
}

export default Brand