import React, {useEffect, useState} from 'react'
import "./Cart.css"
import shorts1 from "../img/shorts1_1.png"
import { FiTrash } from "react-icons/fi"
import { useStateContext } from '../context/context'
import { uploadShippingRates } from '../firebase/firebase'

const Cart = () => {

    const {cart, setCart, showCart, setShowCart, amount} = useStateContext()

    const [total, setTotal] = useState()
    const [shipping, setShipping] = useState()

    const checkout = async () => {
        await fetch("/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items: cart,
                shipping: shipping
            })
        }).then((res) => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }).then((res) => {
            console.log(res)
            window.location.assign(res.url)
        }).catch((error) => {
            console.error(error)
        })
    }

    const changeQty = (sign, i) => {
        if (sign == "plus"){
            setCart((state) => (state.map((item, x) => x == i ? {...item, quantity: parseInt(item.quantity) + 1} : {...item})))
        }else {
            if (cart[i].quantity == 1){
                return
            } else{
                setCart((state) => (state.map((item, x) => x == i ? {...item, quantity: parseInt(item.quantity) - 1} : {...item})))
            }
        }
    }

    const deleteItem = (i) => {
        if (cart?.length == 1){
            setCart([])
        } else{
            let data = [...cart]
            data.splice(i,1)
            setCart([...data])
        }
        
    }

    const getTotalCost = () => {
        let num = 0
        for (let n = 0; n < cart?.length; n++){
            let item = cart[n]
            num += item.price * item.quantity
        }
        setTotal(parseFloat(num).toFixed(2))
    }

    const fetchShipping = async () => {
        let data = await uploadShippingRates()
        return setShipping([...data])
    }

    useEffect(() => {
        fetchShipping()
    }, [])

    useEffect(() => {
        getTotalCost()
    }, [cart])

    console.log(101, cart, total, shipping)

  return (
    <div className='cartPage'>
        <div className="cartBlank" onClick={() => setShowCart(false)}></div>
        <div className="cartSide">
            <div className="cartHeader">
                <div className="cartHeaderTitle">SHOPPING CART</div>
                <div className="exitCart" onClick={() => setShowCart(false)}>CONTINUE SHOPPING</div>
                <div className="cartContentsTitles">
                    <div className="itemTitle">ITEM:</div>
                    <div className="qtyTitle">QTY:</div>
                    <div className="priceTitle">PRICE:</div>
                </div>
            </div>
            <div className="cartContents">
                {cart?.map((cartItem, i) => {
                    return(
                        <CartItem item={cartItem} num={i} deleteItem={deleteItem} changeQty={changeQty}/>
                    )
                })}
            </div>
            <div className="cartCheckout">
                <div className="cartTotal">
                    <div className='cartTotalSub'>SUB-TOTAL: £{total}</div>
                </div>
                <div className="cartTotalInfo">{amount} ITEMS</div>
                <div className="cartTotalBtn" onClick={() => {checkout()}}>CHECKOUT</div>
            </div>
        </div>
    </div>
  )
}

export default Cart

const CartItem = ({item, num, changeQty, deleteItem}) => {
    console.log(123, item)
    return (
        <div className="cartItem">
            <div className="cartInfo">
                <img src={item?.image} alt="" className="cartItemImg" />
                <div className="cartDesc">
                    <div>{item?.name}</div>
                    <div>Colour: {item?.colour}</div>
                    <div>Size: {item?.size?.toUpperCase()}</div>
                    <div>£{item?.price}</div>
                </div>
            </div>
            <div className="cartQty">
                <div className="qtyMinus" onClick={() => changeQty("minus", num)}>-</div>
                <div className="qtyNum">{item?.quantity}</div>
                <div className="qtyPlus" onClick={() => changeQty("plus", num)}>+</div>
                <FiTrash onClick={() => deleteItem(num)}/>
            </div>
            <div className="cartPrice price">
                <div>£{(item?.quantity * item?.price.toFixed(2)).toFixed(2)}</div>
            </div>
        </div>
    )
}