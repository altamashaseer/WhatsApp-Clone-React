import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import logo from '../media/logo.svg'
import Background from "../Background";

function Login() {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (err) {
            setErr(true);
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
                <span className='title'>Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder='Email' />
                    <input type="password" name="password" placeholder='Password' />
                    <button>Sign in <span class="material-symbols-outlined">login</span></button>
                </form>
                <p>Don't have an account? <Link to='/register'>Register</Link></p>
            </div>
        </div>
    )
}

export default Login