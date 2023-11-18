import React, { useEffect, useRef, useState } from 'react'
import "./Contact.css"
import { useNavigate } from 'react-router-dom'
import { addDoc, getDocs, getDoc, collection, serverTimestamp, setDoc, doc, deleteDoc, query, where, onSnapshot, orderBy, updateDoc, or, limit } from 'firebase/firestore'
import { storage, db, uploadBrandMsg, uploadContactInfo } from '../firebase/firebase'
import { useStateContext } from '../context/context'
import Auth from './Auth'

const Contact = () => {

    const navigate = useNavigate()

    const {user, setUser} = useStateContext()

    const tiktokRef = useRef()
    const tiktokLinkRef = useRef()
    const instaRef = useRef()
    const instaLinkRef = useRef()
    const emailRef = useRef()

    const [tiktok, setTiktok] = useState()
    const [insta, setInsta] = useState()
    const [email, setEmail] = useState()

    const fetchContactDets = async () => {
        let data = await uploadContactInfo()
        return setTiktok({...data.tiktok}), setInsta({...data.insta}), setEmail({...data.email})
    }

    const submit = async (e, info) => {
        let docRef = doc(db, "contact", info)
        if (info == "tiktok"){
            try{
                await setDoc(docRef, {
                    name: tiktokRef.current.value,
                    link: tiktokLinkRef.current.value
                })
                alert("This has been updated!")
            } catch (err){
                e.preventDefault()
                alert("There was an error please try again!")
                console.error(err)
            }
        }else if (info == "insta"){
            try{
                await setDoc(docRef, {
                    name: instaRef.current.value,
                    link: instaLinkRef.current.value
                })
                alert("This has been updated!")
            } catch (err){
                e.preventDefault()
                alert("There was an error please try again!")
                console.error(err)
            }
        }else {
            try{
                await setDoc(docRef, {
                    name: emailRef.current.value,
                })
                alert("This has been updated!")
            } catch (err){
                e.preventDefault()
                alert("There was an error please try again!")
                console.error(err)
            }
        }
    }

    useEffect(() => {
        fetchContactDets()
    }, [])

    console.log(tiktok, insta, email)

 if (!user){
    return (<Auth/>)
 } else{
    return (
        <div className='contact'>
            <div className="contactTitle">Contact Info:</div>
            <div className="backHome" onClick={() => navigate("/cms")}>Back to Content Manager</div>
            <div className="contactContainer">
                <form className='form' onSubmit={(e) => (submit(e, "tiktok"))}>
                    <div className="formTitle">TikTok:</div>
                    <div className="inputSection">
                        <div>TikTok name:</div>
                        <input type="text" ref={tiktokRef} required value={tiktok?.name} onChange={(e) => setTiktok(state => ({...state, name: e.target.value}))}/>
                    </div>
                    <div className="inputSection">
                        <div>Link to TikTok:</div>
                        <input type="text" ref={tiktokLinkRef} required value={tiktok?.link} onChange={(e) => setTiktok(state => ({...state, link: e.target.value}))}/>
                    </div>
                    <a href={tiktok?.link}>Link</a>
                    <button className='submitMsg' type='submit'>Submit</button>
                </form>
                <form className='form'>
                    <div className="formTitle">Instagram:</div>
                    <div className="inputSection">
                        <div>Instagram name:</div>
                        <input type="text" ref={instaRef} required value={insta?.name} onChange={(e) => setInsta(state => ({...state, name: e.target.value}))}/>
                    </div>
                    <div className="inputSection">
                        <div>Link to Instagram:</div>
                        <input type="text" ref={instaLinkRef} required value={insta?.link} onChange={(e) => setInsta(state => ({...state, link: e.target.value}))}/>
                    </div>
                    <a href={insta?.link}>Link</a>
                    <button className='submitMsg' onClick={(e) => submit(e, "insta")}>Submit</button>
                </form>
                <form className='form'>
                    <div className="formTitle">Email:</div>
                    <div className="inputSection">
                        <div>Email Address:</div>
                        <input type="text" ref={emailRef} required value={email?.name} onChange={(e) => setEmail(state => ({...state, name: e.target.value}))}/>
                    </div>
                    <button className='submitMsg' onClick={(e) => submit(e, "email")}>Submit</button>
                </form>
                <div className="resetBtn" onClick={() => fetchContactDets()}>Reset to original</div>
            </div>
        </div>
      )
 }
}

export default Contact