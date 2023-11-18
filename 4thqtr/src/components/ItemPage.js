import React, { useEffect, useState } from 'react'
import "./ItemPage.css"
import {BiSolidCart, BiLogoTiktok} from "react-icons/bi"
import {AiFillInstagram} from "react-icons/ai"
import {IoMail} from "react-icons/io5"
import logo from "../img/logo.png"
import img from "../img/shop.png"
import shorts1 from "../img/shorts1_1.png"
import { useNavigate, useParams } from 'react-router-dom'
import { uploadClothesItem, uploadContactInfo, uploadShippingRates, uploadSimialrClothes } from '../firebase/firebase'
import { useStateContext } from '../context/context'
import Cart from './Cart'
import { FiMenu } from 'react-icons/fi'
import Menu from './Menu'

const ItemPage = () => {

    const {cart, setCart, showCart, setShowCart, amount, showMenu, setShowMenu} = useStateContext()

    const {itemId} = useParams()
    
    const [item, setItem] = useState()
    const [similarItems, setSimilarItems] = useState()
    const [quantity, setQuantity] = useState(1)
    const [image, setImage] = useState()
    const [sizeAdd, setSizeAdd] = useState(0)
    const [size, setSize] = useState("")
    const [sizeXS, setSizeXS] = useState(false)
    const [sizeS, setSizeS] = useState(false)
    const [sizeM, setSizeM] = useState(false)
    const [sizeL, setSizeL] = useState(false)
    const [sizeXL, setSizeXL] = useState(false)
    const [sizeOS, setSizeOS] = useState(false)
    const [showDesc, setShowDesc] = useState(false)

    const navigate = useNavigate()

    const [shipping, setShipping] = useState()
    const [info, setInfo] = useState()

    const fetchContactInfo = async () => {
        let data = await uploadContactInfo()
        return setInfo(data)
    }

    const fetchItem = async (id) => {
        let data = await uploadClothesItem(id)
        return setItem(data), setImage(data.mainImg[0]?.url)
    }

    const fetchSimilarItems = async (type) => {
        let data = await uploadSimialrClothes(type)
        return setSimilarItems(data)
    }
    
    const pickSize = (e, size) => {
        if (size == "xs"){
            setSizeXS(true)
            setSizeS(false)
            setSizeM(false)
            setSizeL(false)
            setSizeXL(false)
            setSizeOS(false)
            setSize("xs")
            setSizeAdd(item?.sizeXs?.sizePrice)
        } else if (size == "s"){
            setSizeXS(false)
            setSizeS(true)
            setSizeM(false)
            setSizeL(false)
            setSizeXL(false)
            setSizeOS(false)
            setSize("s")
            setSizeAdd(item?.sizeS?.sizePrice)
        } else if (size == "m"){
            setSizeXS(false)
            setSizeS(false)
            setSizeM(true)
            setSizeL(false)
            setSizeXL(false)
            setSizeOS(false)
            setSize("m")
            setSizeAdd(item?.sizeM?.sizePrice)
        } else if (size == "l"){
            setSizeXS(false)
            setSizeS(false)
            setSizeM(false)
            setSizeL(true)
            setSizeXL(false)
            setSizeOS(false)
            setSize("l")
            setSizeAdd(item?.sizeL?.sizePrice)
        } else if (size == "xl"){
            setSizeXS(false)
            setSizeS(false)
            setSizeM(false)
            setSizeL(false)
            setSizeXL(true)
            setSizeOS(false)
            setSize("xl")
            setSizeAdd(item?.sizeXl?.sizePrice)
        } else{
            setSizeXS(false)
            setSizeS(false)
            setSizeM(false)
            setSizeL(false)
            setSizeXL(false)
            setSizeOS(true)
            setSize("os")
            setSizeAdd(item?.sizeOs?.sizePrice)
        }
    }

    const addToBasket = () => {
        if (size == "" || quantity < 1){
            alert("Make sure you pick a size and quantity.")
            return
        }else{
            let product = {
                name: item?.name,
                price: parseFloat(item?.defaultPrice) + parseFloat(sizeAdd),
                quantity: quantity,
                colour: item?.colour,
                size: size,
                id: item?.id,
                searchId: `${item?.id}${size}`,
                image: item?.mainImg[0].url
            }
            let list = [...cart]
            let dup = false
            list = list.map((listItem) => {
                if (listItem.searchId == product.searchId){
                    dup = true
                    return {
                        ...listItem,
                        quantity: parseInt(listItem.quantity) + parseInt(product.quantity)
                    }
                }else {
                    return {
                        ...listItem
                    }
                }
            })
            if (!dup) {
                list.push(product)
            }
            setCart([...list])
            setQuantity(1)
            setShowCart(true)
        }
    }

    const buyNow = async () => {
        if (size == "" || quantity < 1){
            alert("Make sure you pick a size and quantity.")
            return
        } else {
            try {
                await fetch("http://localhost:4000/checkout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        items: [{
                            name: item?.name,
                            price: parseFloat(item?.defaultPrice) + parseFloat(sizeAdd),
                            quantity: quantity,
                            colour: item?.colour,
                            size: size,
                            id: item?.id,
                            searchId: `${item?.id}${size}`,
                            image: item?.mainImg[0]?.url}],
                        shipping: shipping,
                    })
                }).then((res) => {
                    if (res.ok) return res.json()
                return res.json().then(json => Promise.reject(json))
                }).then((res) => {
                    window.location.assign(res.url)
                }).catch((error) => {
                    console.error(error)
                    alert("There was error please try again")
                })
            } catch (error) {
                console.error(error)
            }
        }
    } 
    
    const fetchShipping = async () => {
        let data = await uploadShippingRates()
        return setShipping([...data])
    }

    useEffect(() => {
        fetchItem(itemId)
        fetchShipping()
        fetchContactInfo()
    }, [itemId])

    useEffect(() => {
        if (item?.type){
            fetchSimilarItems(item?.type[0])
        }
    }, [item])


    console.log(6,item, amount)

  return (
    <div className='itemPage'>
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
            <div className="navItem" onClick={() => navigate("/policies")}>Policies</div>
        </div>
        <div className="socialsList">
          <AiFillInstagram onClick={() => {window.open(`${info?.insta?.link}`)}}/>
          <BiLogoTiktok onClick={() => {window.open(`${info?.tiktok?.link}`)}}/>
          <IoMail onClick={() => navigate("/contact")}/>
        </div>
        <div className="itemPageContainer">
            {item?.outStock && <div className="outStock">Out of Stock</div>}
            <div className="mainImage">
                <img src={image} alt="" />
            </div>
            <div className="secondaryImages">
                {item?.mainImg.map((photo) => {
                    return (
                        <img src={photo.url} alt="" onClick={() => {setImage(photo.url)}}/>
                    )
                })}
                {item?.extraImg.map((photo) => {
                    return (
                        <img src={photo.url} alt="" onClick={() => {setImage(photo.url)}}/>
                    )
                })}
            </div>
            <div className="mainImageDetails">
                <div className="keyDetails">
                    <div className="keyDetailsTitle">{item?.name}</div>
                    <div className="keyDetailsTitle price">£{parseFloat(item?.defaultPrice + sizeAdd.toFixed(2)).toFixed(2)}</div>
                    <div className="keyDetailsExtras">Colour: {item?.colour}</div>
                    <div className="keyDetailsExtras">Size: {item?.sizeXs?.picked ? <div className={`sizeIcon ${sizeXS && "highlight"} ${item?.sizeXs?.sizeStock == 0 && "sizeOutOfStock"}`} onClick={(e) => pickSize(e, "xs")}>XS</div> : ""} {item?.sizeS?.picked ? <div className={`sizeIcon ${sizeS && "highlight"} ${item?.sizeS?.sizeStock == 0 && "sizeOutOfStock"}`} onClick={(e) => pickSize(e, "s")}>S</div> : ""} {item?.sizeM?.picked ? <div className={`sizeIcon ${sizeM && "highlight"} ${item?.sizeM?.sizeStock == 0 && "sizeOutOfStock"}`} onClick={(e) => pickSize(e, "m")}>M</div> : ""} {item?.sizeL?.picked ? <div className={`sizeIcon ${sizeL && "highlight"} ${item?.sizeL?.sizeStock == 0 && "sizeOutOfStock"}`} onClick={(e) => pickSize(e, "l")}>L</div> : ""} {item?.sizeXl?.picked ? <div className={`sizeIcon ${sizeXL && "highlight"} ${item?.sizeXl?.sizeStock == 0 && "sizeOutOfStock"}`} onClick={(e) => pickSize(e, "xl")}>XL</div> : ""} {item?.sizeOs?.picked ? <div className={`sizeIcon ${sizeOS && "highlight"} ${item?.sizeOs?.sizeStock == 0 && "sizeOutOfStock"}`} onClick={(e) => pickSize(e, "os")}>OS</div> : ""}</div>
                    <div className="keyDetailsExtras">Quantity: <input type="number" name="" id="" value={quantity} onChange={(e) => e.target.value < -1 ? setQuantity(1) : setQuantity(e.target.value)}/></div>
                    {!showDesc && <div className='keyDetailsDesc' onClick={() => setShowDesc(!showDesc)}>
                        More Info
                    </div>}
                    {showDesc && <div className='keyDetailsDescText' >
                        <p>{item?.desc.value}</p>
                        <div className='keyDetailsDesc' onClick={() => setShowDesc(!showDesc)}>Close</div>
                    </div>}
                </div>
                <div className="buyBtns">
                    <div className="buyBtn" onClick={() =>{addToBasket()}}>ADD TO BASKET</div>
                    <div className="buyBtn" onClick={() => {buyNow()}}>BUY NOW</div>
                </div>
                <div className="mayAlsoLike">
                    <div className="mayAlsoLikeTitle">You May Also Like:</div>
                    <div className="mayAlsoLikeImgs">
                        {similarItems?.map((simItem) => {
                            if (!simItem.img[0]?.url){
                                return null
                            } else {
                                let img = simItem.img[0]?.url
                                return (
                                    <div className='mayAlsoLikeCard' onClick={() => {navigate(`/shop/${simItem.id}`)}}>
                                        <img src={img} alt="" />
                                        <div>{simItem.name} - {simItem.colour}</div>
                                        <div className='price'>£{simItem.defaultPrice}</div>
                                    </div>
                                )
                            }
                        })}
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ItemPage