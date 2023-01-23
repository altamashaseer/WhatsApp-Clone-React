import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext';
import HomeBG from '../HomeBG';
import Input from './Input'
import Messages from './Messages'

function Chat() {
  const { data } = useContext(ChatContext);
  // console.log(data);

  return (
    <>
      {data.user.uid ? <div className='chat' >
        <div className="chatInfo">
          <div className='userHead'>
            <img src={data.user.photoURL ? data.user.photoURL : 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} alt="user" />
            <span>{data.user?.displayName}</span>
          </div>
          <div className="chatIcons">
            <i className="fa-solid fa-video"></i>
            <i className="fa-solid fa-phone"></i>
            <span className="material-symbols-outlined">more_vert</span>
          </div>
        </div>
        <Messages />
        <Input />
      </div> : <div className='chat'><HomeBG /></div>}
    </>
  )
}

export default Chat