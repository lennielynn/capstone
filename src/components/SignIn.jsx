import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const {signIn} = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/account')
    } catch (e) {
      setError(window.alert('incorrect email or password'))
      console.log(e.message)
    }
  };

  return (
    <div id='sign-in-pg'>
      <div>
        <h1>SIGN IN</h1>
        <p>
          Don't have an account?{' '}
          <Link to='/signup' className='underline'>
            SIGN UP
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit} id='sign-in-form'>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Email Address</label><br/><br/>
          <input 
          onChange={
            (e) => setEmail(e.target.value)
            } 
            className='border p-3'
            type='email' 
            /><br/><br/>
        </div>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Password</label><br/><br/>
          <input 
          onChange={
            (e) => setPassword(e.target.value)
            } 
            className='border p-3' 
            type='password' 
            /><br/><br/>
        </div>
        <button className='button'>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
