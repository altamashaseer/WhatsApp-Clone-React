import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef()

  useEffect(() => { //scroll to current new msg
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  function toDateTime(secs) {
    var t = new Date(Date.UTC(1970, 0, 1));
    t.setUTCSeconds(secs);
    return t;
  }

  // console.log(message);
  // console.log(message.date.seconds);
  // console.log(toDateTime(message.date.seconds).toLocaleDateString());

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt='user' />
        <span className='msgDate'>{toDateTime(message.date.seconds).toLocaleDateString()}</span>
      </div>
      <div className='messageContent'>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="attachment" />}
      </div>

    </div>
  )
}

export default Message