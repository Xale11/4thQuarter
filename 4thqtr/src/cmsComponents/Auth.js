import React, { useEffect, useState } from 'react'
import "./Auth.css"
import { auth } from '../firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/context'


const Auth = () => {

    const navigate = useNavigate()

    const {user, setUser} = useStateContext()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false)
    

    const loginUser = async (e) => {
        try {
            e.preventDefault();
            await signInWithEmailAndPassword(auth, email, password)
            setUser(true)
        } catch (error) {
            console.error(error)
            alert("You have entered the log in details incorrectly, please try again. If you have forgotten the login details please contact the web developer.")
        }
    }

    useEffect(() => {
        setUser(auth.currentUser == null ? false : true)
    }, [auth.currentUser])
    console.log(auth.currentUser, user)
  return (
    <div className='auth'>
        <div className="authContainer">
        <div className="authTitle">Log into Content Manager</div>
            {!show && <div className='loginBtn' onClick={() => setShow(!show)}>Login</div>}
            {show && <form action="" className="form" onSubmit={(e) => loginUser(e)}>
                <div className="inputSection">
                    <div>Email:</div>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="inputSection">
                    <div>Password:</div>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type='submit'>Login</button>
            </form>}
        </div>
    </div>
  )
}

export default Auth