import React from 'react'

function Input() {
    return (
        <div className='input'>
                <i class="fa-regular fa-face-smile"></i>
            <div className="send">
                <label htmlFor="file">
                    <input type="file" id="file" style={{ display: 'none' }} />
                    <i class="fa-solid fa-paperclip"></i>
                </label>
            </div>
            <input type="text" placeholder='Type a message' />
            <span class="material-symbols-outlined">send</span>
        </div>
    )
}

export default Input