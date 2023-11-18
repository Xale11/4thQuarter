import React, { useEffect, useRef, useState } from 'react'
import "./Policies.css"
import { addDoc, getDocs, getDoc, collection, serverTimestamp, setDoc, doc, deleteDoc, query, where, onSnapshot, orderBy, updateDoc, or, limit } from 'firebase/firestore'
import { storage, db, uploadBrandMsg, uploadPolicy } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/context'
import Auth from './Auth'

const Policies = () => {

    const navigate = useNavigate()

    const {user, setUser} = useStateContext()

    const [policy, setPolicy] = useState()

    const policyRef = useRef()

    const fetchPolicy = async () => {
        let data = await uploadPolicy()
        setPolicy({...data.policy})
    }

    const submitPolicy = async (e) => {
        try{
            await setDoc(doc(db, "policies", "policy"), {
                text: policyRef.current.value.split(/\n\s*\n/),
                value: policyRef.current.value,
            })
            alert("This has been updated!")
        }catch (err){
            console.error(err)
            alert("There was an error. Please try again")
        }
    }

    useEffect(() => {
        fetchPolicy()
    }, [])

    console.log(policy)

  if (!user){
    return (<Auth/>)
  } else{
    return (
        <div className='policiesList'>
            <div className="policiesContainer">
            <div className="policiesTitle">Return Policies:</div>
            <div className="backHome" onClick={() => navigate("/cms")}>Back to Content Manager</div>
                <form className='form'>
                    <textarea name="" id="" cols="80" rows="40" ref={policyRef} value={policy?.value} onChange={(e) => setPolicy({value: e.target.value, text: e.target.value.split(/\n\s*\n/),})}></textarea>
                    <button className='submitMsg' onClick={(e) => submitPolicy(e)}>Submit</button>
                    <div className="resetBtn" onClick={() => fetchPolicy()}>Reset to Original</div>
                </form>
            </div>
        </div>
      )
  }
}

export default Policies