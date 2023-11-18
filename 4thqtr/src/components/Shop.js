import React from 'react'
import img from "../img/shop.png"
import shorts1 from "../img/shorts1_1.png"
import shirt1 from "../img/shirt1.jpg"
import {BiSolidCart, BiLogoTiktok} from "react-icons/bi"
import { useStateContext } from '../context/context'
// import "./Shop.css"

const Shop = () => {

    const {cart} = useStateContext()

  return (
    <div className='shop'>
        <div className="cartIcon">
            <BiSolidCart/>
            {cart.length > 0 && <div>{cart.length}</div>}
        </div>
        <img src={img} alt="" className='shopImg'/>
        <div className="shopContent">
            <div className="shopTitle"><div>THE <span className='red'>SHOP</span> - ONE OF ONE</div></div>
            <div className="shopCards">
                <div className="shopCard2">
                    <div className="scImg">
                        <div className="buyNow">BUY NOW </div>
                        <img src={shirt1} alt="" />
                    </div>
                    <div className="sc2Dets">
                        <div className="sc2Content">
                            <div className="sc2Name">ONE OF ONE GRAPHIC TEE</div>
                            <div className="sc2Price">£25.00</div>
                        </div>
                    </div>
                    <div className="sc2Comment">
                        <div>THEY TOOK THEIR <span className='red'>SHOT!</span></div>
                        <div>THEY MADE IT!</div>
                    </div>
                </div>
                <div className="shopCard1">
                    <div className="scImg">
                        <div className="buyNow">BUY NOW </div>
                        <img src={shorts1} alt="" />
                    </div>
                    <div className="sc1Dets">
                    <div className="sc1Content">
                            <div className="sc1Name">ONE OF ONE SHORTS</div>
                            <div className="sc1Price">£25.00</div>
                        </div>
                    </div>
                    <div className="sc1Comment">
                        <div>THEY CONQUERED THE <span className='red'>4TH!</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Shop