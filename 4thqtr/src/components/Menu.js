import React from 'react'
import "./Menu.css"
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/context'

const Menu = () => {

    const {showMenu, setShowMenu} = useStateContext()

    const navigate = useNavigate()

  return (
    <div className='menu'>
        <div className="closeMenu" onClick={() => {setShowMenu(false)}}>X</div>
        <div className="menuLink" onClick={() => {navigate("/"); setShowMenu(false)}}>Home</div>
        <div className="menuLink" onClick={() => {navigate("/shop"); setShowMenu(false)}}>Shop</div>
        <div className="menuLink" onClick={() => {navigate("/gallery"); setShowMenu(false)}}>Gallery</div>
        <div className="menuLink" onClick={() => {navigate("/brand"); setShowMenu(false)}}>The Brand</div>
        <div className="menuLink" onClick={() => {navigate("/contact"); setShowMenu(false)}}>Contact</div>
        <div className="menuLink" onClick={() => {navigate("/policies"); setShowMenu(false)}}>Policies</div>
    </div>
  )
}

export default Menu