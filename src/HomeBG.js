import React from 'react'
import './App.css'
import homeBG from '../src/media/home.png'

function HomeBG() {
  return (
    <div className='homeBG'>
      <img src={homeBG} alt="homeBG" />
      <h1>WhatsApp Web</h1>
      <span>Send and receive messages without keeping your phone online. <br /> Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</span>
      <span className='base'><i class="fa-solid fa-lock"></i>  End-to-end encrypted</span>
      <div className="foot"></div>
    </div>
  )
}

export default HomeBG