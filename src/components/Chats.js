import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';

function Chats() {
    const [chats, setChats] = useState([])
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid])

    const handleSelect = (data) => {
        dispatch({ type: 'CHANGE_USER', payload: data })
    }

    return (
        <div className='chats'>
            {Object.entries(chats)?.map((chat) => {
                return <div className="userchat" key={chat[0]} onClick={() => { handleSelect(chat[1].userInfo) }}>
                    <img src={chat[1].userInfo.photoURL} alt="dp" />
                    <div className='userChatInfo'>
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].userInfo.lastMessage?.text}</p>
                    </div>
                </div>
            })}
        </div>
    )
}

export default Chats