import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {createUser} = UserAuth()



  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createUser(email,password)
      navigate('/welcome')
    } catch(e){
      setError(e.message)
      console.log(e.message)
    }
  }




  return (
    <div id='sign-up-pg'>
      <div>
        <h1 className='text-2xl font-bold py-2'>SIGN UP</h1>
        <p className='py-2'>
          Already have an account?{' '}
          <Link to='/' className='underline'>
            SIGN IN.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit} id='sign-up-form'>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Email Address</label><br/><br/>
          <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="email"/><br/><br/>
        </div>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Password</label><br/><br/>
          <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type="password"/><br/><br/>
        </div>
        <button className='button'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp