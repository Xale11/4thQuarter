import React, { useEffect, useRef, useState } from 'react'
import "./Delivery.css"
import { addDoc, getDocs, getDoc, collection, serverTimestamp, setDoc, doc, deleteDoc, query, where, onSnapshot, orderBy, updateDoc, or, limit } from 'firebase/firestore'
import { db, uploadShippingRates } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/context'
import Auth from './Auth'

const Delivery = () => {

    const navigate = useNavigate()

    const {user, setUser} = useStateContext()

    const shipName = useRef()
    const shipDesc = useRef()
    const shipPrice = useRef()
    const shipMin = useRef()
    const shipMax = useRef()

    const [shipping, setShipping] = useState()
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState(0)
    const [min, setMin] = useState(1)
    const [max, setMax] = useState(2)
    const [isDelete, setIsDelete] = useState(false)
    

    const addShippingRate = async (e) => {
        try {
            await setDoc(doc(db, "shipping", `${shipName.current.value}`), {
                name: shipName.current.value,
                price: shipPrice.current.value,
                shipMin: shipMin.current.value,
                shipMax: shipMax.current.value
            })
            alert("This has been updated!")
        } catch (error) {
            e.preventDefault()
            alert("There was an error please try again!")
            console.error(error)
        }
    }

    const fetchShippingRates = async () => {
        let data = await uploadShippingRates()
        return setShipping([...data])
    }

    const updateRate = async (e, id, i) => {
        try {
            await setDoc(doc(db, "shipping", `${id}`), {
                name: shipping[i].name,
                price: shipping[i].price,
                shipMin: parseInt(shipping[i].shipMin),
                shipMax: parseInt(shipping[i].shipMax)
            })
        } catch (error) {
            e.preventDefault()
            console.error(error)
            alert("There was an error please try again!")
        }
    }

    const deleteRate = async (e, id) => {
        try {
            await deleteDoc(doc(db, "shipping", `${id}`))
            fetchShippingRates()
        } catch (error) {
            e.preventDefault()
            console.error(error)
            alert("There was an error please try again!")
        }
    }

    useEffect(() => {
        fetchShippingRates()
    }, [])

    console.log(shipping)

  if (!user){
    return (<Auth/>)
  } else{
    return (
        <div className='delivery'>
            <div className="deliveryTitle">Shipping Fees</div>
            <div className="deliveryContainer">
            <div className="backHome" onClick={() => navigate("/cms")}>Back to Content Manager</div>
                <form className='form' onSubmit={(e) => addShippingRate(e)}>
                <div className="formTitle">Shipping fees and details:</div>
                    <div className="inputSection">
                        <div>Shipping name:</div>
                        <input required type="text" ref={shipName} value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="inputSection">
                        <div>Shipping Price (£):</div>
                        <input required type="number" step="0.01" ref={shipPrice} value={price} onChange={(e) => setPrice(e.target.value < 0 ? 0 : e.target.value)}/>
                    </div>
                    <div className="inputSection">
                        <div>Minimum Delivery Days:</div>
                        <input required type="number" ref={shipMin} value={min} onChange={(e) => setMin(e.target.value < 1 ? 1 : e.target.value)}/>
                    </div>
                    <div className="inputSection">
                        <div>Maximum Delivery Days:</div>
                        <input required type="number" ref={shipMax} value={max} onChange={(e) => setMax(e.target.value <= min ? (parseInt(min)) : e.target.value)}/>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
                <div className="rateListTitle">Current Shipping Rates:</div>
                <div className="rateList">
                    {shipping?.map((rate, i) => {
                        return (
                            <form className='rateCard form'>
                                <div className="inputSection">
                                    <div>Shipping Name:</div>
                                    <input required type="text" value={rate.name} onChange={(e) => {setShipping(state => (state.map((item, x) => x == i ? {...item, name: e.target.value} : {...item})))}}/>
                                </div>
                                <div className="inputSection">
                                    <div>Shipping Price (£):</div>
                                    <input required type="number" value={rate.price} step="0.01" onChange={(e) => {setShipping(state => (state.map((item, x) => x == i ? {...item, price: e.target.value} : {...item})))}}/>
                                </div>
                                <div className="inputSection">
                                    <div>Minimum Delivery Days:</div>
                                    <input required type="number" value={rate.shipMin} onChange={(e) => {setShipping(state => (state.map((item, x) => x == i ? {...item, shipMin: e.target.value < 1 ? 1 : e.target.value} : {...item})))}}/>
                                </div>
                                <div className="inputSection">
                                    <div>Maximum Delivery Days:</div>
                                    <input required type="number" value={rate.shipMax} onChange={(e) => {setShipping(state => (state.map((item, x) => x == i ? {...item, shipMax: e.target.value <= parseInt(rate.shipMin) ?(parseInt(rate.shipMin)) : e.target.value} : {...item})))}}/>
                                </div>
                                <button style={{backgroundColor: "green"}} onClick={(e) => updateRate(e, rate.id, i)}>Update</button>
                                <button>{!isDelete ? <div className='delBtn' onClick={(e) => {e.preventDefault(); setIsDelete(!isDelete)}}>Delete</div> : <div className='delBtn' onClick={(e) => {e.preventDefault(); setIsDelete(!isDelete)}}>Close
                                </div>}{isDelete && <div className='deleteConfirm' onClick={(e) => {deleteRate(e, rate.id)}}>Confirm Delete</div>}</button>
                                <button style={{backgroundColor: "darkgreen"}} onClick={() => fetchShippingRates()}>Reset to Original</button>
                            </form>
                        )
                    })}
                </div>
            </div>
        </div>
      )
  }
}

export default Delivery