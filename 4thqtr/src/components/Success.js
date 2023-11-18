import React, { useEffect, useState } from 'react'
import "./Success.css"
import { updateStockCount, uploadPromoClothes } from '../firebase/firebase'
import { useStateContext } from '../context/context'
import { useNavigate } from 'react-router-dom'

const Success = () => {

    const navigate = useNavigate()

    const {cart, setCart} = useStateContext()

    const [clothes, setClothes] = useState([])
    const [test, setTest] = useState()

    const fetchClothesItems = async () => {
        let data = await uploadPromoClothes()
        return setClothes(data)
    }

    const updateStock = async () => {
        await updateStockCount([...cart])
        localStorage.clear()
        setCart([])
        // navigate("/")
    }

    useEffect(() => {
        fetchClothesItems()
        updateStock()
    }, [])

    console.log(60, clothes, cart, test)

  return (
    <div className='success'>
        <div className="successContainer">
            <div>Your payment has been confirmed! </div>
            <div>Thank you for your purchase.</div>
            <div>Check your email for further details</div>
            <div className="return" onClick={() => {navigate("/")}}>Return to homepage</div>
        </div>
    </div>
  )
}

export default Success