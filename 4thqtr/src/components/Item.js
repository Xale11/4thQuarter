import React, { useEffect, useState } from 'react'
import "./Item.css"
import { useNavigate } from 'react-router-dom'

const Item = ({item}) => {

    const navigate = useNavigate()

    const [image, setImage] = useState(false)

    let img1 = item?.img[0].url

    useEffect(() => {
        setImage(item?.img[0].url)
    }, [])

    console.log(6,item)
  return (
    <div className="shopCard1" onClick={() => navigate(`/shop/${item.id}`)} onMouseOver={() => { setImage(item?.img[1] ? item?.img[1]?.url : item?.img[0]?.url) }} onMouseLeave={() => { setImage(item?.img[0]?.url)}}>
        <div className="scImg">
            {item?.outStock && <div className="outStock">Out Of Stock</div>}
            <img src={image} alt="" />
            <div className="shopCardDets">
                <div className="scInfo">
                    <div className="scTitle">{item.name}</div>
                    <div className="scTitle">{item.colour}</div>
                    <div className="scTitle price">£{item.defaultPrice}</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Item