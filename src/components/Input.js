import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

function Input() {
    const [text, setText] = useState('')
    const [img, setImg] = useState(null)

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    return (
        <div className='input'>
            <i className="fa-regular fa-face-smile"></i>
            <div className="send">
                <label htmlFor="file">
                    <input type="file" id="file" style={{ display: 'none' }} onChange={(e) => { setFile(e.target.files[0]) }} />
                    <i className="fa-solid fa-paperclip"></i>
                </label>
            </div>
            <input type="text" placeholder='Type a message' onChange={(e) => { setText(e.target.value) }} />
            <span className="material-symbols-outlined" onClick={handleSend}>send</span>
        </div>
    )
}

export default Input