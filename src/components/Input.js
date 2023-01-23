import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { doc, updateDoc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from 'uuid'
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function Input() {
    const [text, setText] = useState('')
    const [img, setImg] = useState(null)

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    //TODO:Handle Error
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );
        }
        else {
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })
        }

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp()
        })

        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp()
        })
        setText('')
        setImg(null)
    }

    const handleKey = (e) => {
            e.code === 'Enter' && handleSend() 
          }
    return (
        <div className='input'>
            <i className="fa-regular fa-face-smile"></i>
            <div className="send">
                <label htmlFor="file">
                    <input type="file" id="file" style={{ display: 'none' }} onChange={(e) => { setImg(e.target.files[0]) }} />
                    <i className="fa-solid fa-paperclip"></i>
                </label>
            </div>
            <input type="text" placeholder='Type a message' onChange={(e) => { setText(e.target.value) }} onKeyDown={handleKey} value={text} />
            <span className="material-symbols-outlined" onClick={handleSend}>send</span>
        </div>
    )
}

export default Input