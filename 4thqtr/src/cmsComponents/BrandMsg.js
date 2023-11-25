import React, { useEffect, useRef, useState } from 'react'
import { addDoc, getDocs, getDoc, collection, serverTimestamp, setDoc, doc, deleteDoc, query, where, onSnapshot, orderBy, updateDoc, or, limit } from 'firebase/firestore'
import { storage, db, uploadBrandMsg } from '../firebase/firebase'
import "./BrandMsg.css"
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/context'
import Auth from './Auth'

const BrandMsg = () => {

    const navigate = useNavigate()

    const {user, setUser} = useStateContext()

    const msg = useRef()
    const [test, setTest] = useState()
    const [arr, setArr] = useState()
    const [belief, setBelief] = useState()
    const [vision, setVision] = useState()
    const [values, setValues] = useState()


    const beliefMsg = useRef()
    const visionMsg = useRef()
    const valuesMsg = useRef()

    const showText = () => {
        let paras = msg.current.value.split(/\n\s*\n/)
        setArr(paras)
    }

    const fetchMessage = async () => {
        let data = await uploadBrandMsg()
        return setValues({...data.values}), setBelief({...data.belief}), setVision({...data.vision})
    }

    const submitMsg = async (e, type) => {
        e.preventDefault()
        if (type == "belief"){
            try{
                let paras = beliefMsg.current.value.split(/\n\s*\n/)
                const item = await setDoc(doc(db, "brandMsg", "belief"), {
                    message: [...paras],
                    value: beliefMsg.current.value
                })
                alert("This has been updated")
            } catch (err){
                console.error(err)
                alert("There was an error. Please try again")
            }
        } else if (type == "vision"){
            try{
                let paras = visionMsg.current.value.split(/\n\s*\n/)
                const item = await setDoc(doc(db, "brandMsg", "vision"), {
                    message: [...paras],
                    value: visionMsg.current.value
                })
                alert("This has been updated")
            } catch (err){
                console.error(err)
                alert("There was an error. Please try again")
            }
        } else{
            try{
                let paras = valuesMsg.current.value.split(/\n\s*\n/)
                const item = await setDoc(doc(db, "brandMsg", "values"), {
                    message: [...paras],
                    value: valuesMsg.current.value
                })
                alert("This has been updated")
            } catch (err){
                console.error(err)
                alert("There was an error. Please try again")
            }
        }
    }

    useEffect(() => {
        fetchMessage()
    }, [])

    // console.log(belief, vision, values)

  if (!user){
    return (<Auth/>)
  } else{
    return (
        <div className='brandMsg'>
            <div className="brandMsgContainer">
                <div className="brandMsgTitle">Brand Message and Values:</div>
                <div className="backHome" onClick={() => navigate("/cms")}>Back to Content Manager</div>
                <div className="resetBtn">Reset to Original</div>
                <form className='form'>
                    <div className="formTitle">Our Beliefs:</div>
                    <textarea name="" id="" cols="30" rows="10" ref={beliefMsg} value={belief?.value} onChange={(e) => setBelief({value: e.target.value, message: e.target.value.split(/\n\s*\n/)})}></textarea>
                    <button className='submitMsg' onClick={(e) => submitMsg(e, "belief")}>Submit</button>
                </form>
                <form className='form'>
                    <div className="formTitle">Our Vision:</div>
                    <textarea name="" id="" cols="30" rows="10" ref={visionMsg} value={vision?.value} onChange={(e) => setVision({value: e.target.value, message: e.target.value.split(/\n\s*\n/)})}></textarea>
                    <button className='submitMsg' onClick={(e) => submitMsg(e, "vision")}>Submit</button>
                </form>
                <form className='form'>
                    <div className="formTitle">Our Values:</div>
                    <textarea name="" id="" cols="30" rows="10" ref={valuesMsg} value={values?.value} onChange={(e) => setValues({value: e.target.value, message: e.target.value.split(/\n\s*\n/)})}></textarea>
                    <button className='submitMsg' onClick={(e) => submitMsg(e, "values")}>Submit</button>
                </form>
            </div>
            
        </div>
    )
  }
}

export default BrandMsg