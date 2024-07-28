import React from 'react'
import { useSelector } from 'react-redux'
import { CDN_URL } from '../utils/constants'
const Cart = () => {
  const cartItems=useSelector((store)=>store.cart.items)
  console.log(cartItems);
  return (
    <div className='cart'>
      <h1>Cart</h1>
      {cartItems.map((item)=>{
        return(
          <div>
          <h2>{item.card.info.name}</h2>
          <img src={CDN_URL+item.card.info.imageId}/>
          </div>
        )
      })}
    </div>
  )
}

export default Cart  