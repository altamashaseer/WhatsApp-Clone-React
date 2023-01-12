import React from 'react'

function Register() {
    return (
        <div className='formContainer'> 
            <div className="formWrapper">
                <span className='logo'>WhatsApp Logo</span>
                <span className='title'>Register</span>
                <form >
                    <input type="text" name="username" placeholder='Name' />
                    <input type="email" name="email" placeholder='Email' />
                    <input type="password" name="password" placeholder='Password' />
                    <input type="file" name="dp" />
                    <button>Sign up</button>
                </form>
                <p>Already have an account? Login</p>
            </div>
        </div>
    )
}

export default Register