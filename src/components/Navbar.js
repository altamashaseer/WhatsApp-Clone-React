import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const { currentUser } = useContext(AuthContext)
  return (
    <div className='navbar'>
      <span className='logo'>WhatsApp</span>
      <div className="user">
        <span>{currentUser.displayName}</span>
        <img src={currentUser.photoURL} alt="dp" />
        <i onClick={() => { signOut(auth) }} className="fa-solid fa-right-from-bracket"></i>
      </div>
    </div>
  )
}

export default Navbar