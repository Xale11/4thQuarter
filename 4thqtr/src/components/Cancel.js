import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/context'
import "./Success.css"

const Cancel = () => {

    const navigate = useNavigate()

    const {setShowCart} = useStateContext()

  return (
    <div className='success'>
        <div className="successContainer">
            <div>Your payment was declined. </div>
            <div>Please try again.</div>
            <div className="return" onClick={() => {setShowCart(true); navigate("/shop")}}>Return to cart</div>
        </div>
    </div>
  )
}

export default Cancel