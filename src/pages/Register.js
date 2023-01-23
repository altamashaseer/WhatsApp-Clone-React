import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import logo from '../media/logo.svg'
import Background from "../Background";

const Register = () => {
    const [err, setErr] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        let file = e.target[3].files[0];
        // if (file === undefined) {
        //     file = { userdp }
        // }
        // console.log(file);
        // console.log(e);

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch (err) {
                        console.log("ERROR:");
                        console.log(err);
                        setErr(true);
                        // setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            console.log("ERROR:");
            console.log(err);
        }
    };

    return (
        <div className='formContainer'>
            <Background />
            <div className='logo'>
                <img src={logo} alt="logo" />
                <span>WHATSAPP WEB</span>
            </div>
            <div className="formWrapper">
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder='Name' />
                    <input type="email" name="email" placeholder='Email' />
                    <input type="password" name="password" placeholder='Password' />
                    <label htmlFor='dp'>
                        <span class="material-symbols-outlined">face</span> Add an Avatar
                        <input type="file" id='dp' style={{ display: 'none' }} />
                    </label>
                    <button>Sign up</button>
                    {err && <span>Something went wrong, Try changing Email ID</span>}
                </form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>

        </div>
    )
}

export default Register