import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from '../context/AuthContext';
import { doc, setDoc } from "firebase/firestore";

function Search() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('displayName', '==', username))
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch (error) {
      setErr(true)
    }
  }
  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch()
  }

  const handleSubmit = async () => {
    //Check whether group exist, if not create new
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) { }

    setUser(null);
    setUsername("")
  }
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Search a user' onKeyDown={handleKey} onChange={(e) => { setUsername(e.target.value) }} value={username} />
      </div>
      {err && <span>User not found</span>}
      {user && <div className="userchat" style={{ cursor: 'pointer' }} onClick={handleSubmit}>
        <img src={user.photoURL} alt="dp" />
        <div className='userChatInfo'>
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search