import React from 'react'

function Message() {
  return (
    <div className='message owner'>
        <div className="messageInfo">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/002/002/253/small/beautiful-woman-wearing-sunglasses-avatar-character-icon-free-vector.jpg" alt='user' />
            <span>just now</span>
        </div>
        <div className='messageContent'>
            <p>Hello</p>
            <img src="https://static.vecteezy.com/system/resources/thumbnails/002/002/253/small/beautiful-woman-wearing-sunglasses-avatar-character-icon-free-vector.jpg" alt="attachment" />
        </div>

    </div>
  )
}

export default Message