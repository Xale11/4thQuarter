import React, { useEffect, useState } from 'react'
import img from "../img/shop.png"
import shorts1 from "../img/shorts1_1.png"
import shirt1 from "../img/shirt1.jpg"
import {BiSolidCart, BiLogoTiktok} from "react-icons/bi"
import logo from "../img/logo.png"
// import "./Shop2.css"
import { useNavigate } from 'react-router-dom'
import Credits from './Credits'
import { uploadPromoClothes } from '../firebase/firebase'
import Item from './Item'


const Shop2 = () => {

    const navigate = useNavigate()
    const [clothes, setClothes] = useState()
    const [test, setTest] = useState(false)

    const fetchPromoData = async () => {
        let data = await uploadPromoClothes()
        return setClothes([...data])
    }

    useEffect(() => {
        fetchPromoData()
    }, [])

    console.log(101, clothes)

  return (
    <div className='shop'>
        <div className="cartIcon">
            <BiSolidCart/>
        </div>
        <img src={img} alt="" className='shopImg'/>
        <img src={logo} alt="" className='logoIcon' onClick={() => navigate("/")}/>
        <div className="navItems black">
          <div className="navItem" onClick={() => navigate("/")}>Home</div>
          <div className="navItem" onClick={() => navigate("/shop")}>Shop</div>
          <div className="navItem" onClick={() => navigate("/gallery")}>Gallery</div>
          <div className="navItem" onClick={() => navigate("/brand")}>The Brand</div>
          <div className="navItem" onClick={() => navigate("/contact")}>Contact</div>
          <div className="navItem" onClick={() => navigate("/policies")}>Policies</div>
          <div className="navItem" onClick={() => navigate("/")}>Login</div>
        </div>
        <div className="shopContent">
            <div className="shopCards">
                {clothes?.map((item) => {
                    let img1 = item?.img[0].url
                    return(
                        <Item item={item}></Item>
                    )
                })}
                {/* <div className="shopCard1">
                    <div className="scImg">
                        <div className="buyNow">BUY NOW </div>
                        <img src={shirt1} alt="" />
                        <div className="shopCardDets">
                            <div className="scInfo">
                                <div className="scTitle">ONE OF ONE GRAPHIC TEE</div>
                                <div className="scTitle price">£19.99</div>
                                <div className="scBtns">
                                    <div>ADD TO BASKET</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shopCard2">
                    <div className="scImg">
                        <div className="buyNow">BUY NOW </div>
                        <img src={shorts1} alt="" />
                        <div className="shopCardDets">
                            <div className="scInfo">
                                <div className="scTitle">ONE OF ONE GRAPHIC TEE</div>
                                <div className="scTitle price">£19.99</div>
                                <div className="scBtns">
                                    <div>ADD TO BASKET</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
        <Credits/>
    </div>
  )
}

export default Shop2