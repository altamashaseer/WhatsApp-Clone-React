import React from 'react'

function Register() {
  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <form >
                <input type="text" name="username" placeholder='Display Name'  />
                <input type="email" name="email" placeholder='email' />
                <input type="password" name="password" placeholder='password' />
            </form>
        </div>
    </div>
  )
}

export default Register