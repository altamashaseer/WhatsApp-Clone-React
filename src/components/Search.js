import React from 'react'

function Search() {
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Search a user' />
      </div>
      <div className="userchat">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg" alt="dp" />
        <div className='userChatInfo'>
          <span>Jane</span>
        </div>
      </div>
    </div>
  )
}

export default Search