import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
      <span className='logo'>WhatsApp</span>  
      <div className="user">
        <img src="https://cdn.dribbble.com/users/1040983/screenshots/5630845/media/e95768b82810699dfd54512ff570954a.png?compress=1&resize=400x300" alt="dp" />
        {/* <span>John</span> */}
        <i className="fa-solid fa-right-from-bracket"></i>
      </div>
    </div>
  )
}

export default Navbar