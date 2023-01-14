import React from 'react'

function Login() {
    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className='logo'>WhatsApp Logo</span>
                <span className='title'>Login</span>
                <form >
                    <input type="email" name="email" placeholder='Email' />
                    <input type="password" name="password" placeholder='Password' />
                    <button>Sign in</button>
                </form>
                <p>Don't have an account? Register</p>
            </div>
        </div>
    )
}

export default Login