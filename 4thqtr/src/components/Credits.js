import React, { useEffect, useState } from 'react'
import "./Credits.css"
import {AiFillInstagram} from "react-icons/ai"
import {FaTiktok} from "react-icons/fa"
import {IoMail} from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import { uploadContactInfo } from '../firebase/firebase'

const Credits = () => {

    const navigate = useNavigate()

    const [info, setInfo] = useState()

    const fetchContactInfo = async () => {
        let data = await uploadContactInfo()
        return setInfo(data)
    }

    useEffect(() => {
        fetchContactInfo()
    }, [])

    // console.log(info)

  return (
    <div className='credits'>
        <div className="linkSide">
            <div className="link" onClick={() => {navigate("/contact")}}>
                <IoMail/>
                <div>{info?.email?.name}</div>
            </div>
            <div className="link" onClick={() => {window.open(`${info?.insta?.link}`)}}>
                <AiFillInstagram/>
                <div>{info?.insta?.name}</div>
            </div>
            <div className="link" onClick={() => {window.open(`${info?.tiktok?.link}`)}}>
                <FaTiktok/>
                <div>{info?.tiktok?.name}</div>
            </div>
            <div className="policies">
                <div onClick={() => {navigate("/policies")}}>RETURN POLICY</div>
                <div onClick={() => {navigate("/contact")}}>CONTACT US</div>
            </div>
        </div>
        <div className="joinSide">
            <div className="joinTitle">JOIN THE <span className='red'>SQUAD</span></div>
            <form className="joinInputs">
                <input type="text"  placeholder='ENTER EMAIL...'/>
                <div className="submit">JOIN</div>
            </form>
        </div>
    </div>
  )
}

export default Credits