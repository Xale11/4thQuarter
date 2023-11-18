import React, { useEffect, useState } from 'react'
import { createContext, useContext } from 'react'

const ContextApi = createContext()

const getCart = () => {
  const data = sessionStorage.getItem("cart")
  return data ? JSON.parse(data) : []
}

const Context = ({children}) => {


  const [cart, setCart] = useState(getCart)
  const [showCart, setShowCart] = useState(false)
  const [amount, setAmount] = useState(0)
  const [user, setUser] = useState(false)
  const [showMenu, setShowMenu] = useState(false)


  const adjustQty = () => {
    let num = 0;
    for (let i = 0; i < cart?.length; i++){
      let item = cart[i]
      num += parseInt(item.quantity)
    }
    setAmount(num)
  }


  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart))
    adjustQty()
  }, [cart])

  return (
    <ContextApi.Provider value={{cart, setCart, showCart, setShowCart, amount, setAmount, user, setUser, showMenu, setShowMenu}}>
        {children}
    </ContextApi.Provider>
  )
}

export const useStateContext = () => useContext(ContextApi)

export default Context