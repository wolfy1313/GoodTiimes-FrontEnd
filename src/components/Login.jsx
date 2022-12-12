import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginUser } from '../services/Auth'

const Login = ({toggleAuthenticated, setUser}) => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({ username: '', password: ''})

  const handleChange = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = await LoginUser(formValues);
    setFormValues({ username: '', password: ''})
    setUser(payload)
    toggleAuthenticated(true);
    navigate('/')
  }
  return (
    <div className="login-page">
    <div className="login-wrapper">
      <form className="col" onSubmit={handleSubmit}>
        <div>
          <label className="login-label"htmlFor="username">Username</label>
          <input className="login-inputs"
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="example@example.com"
            value={formValues.username}
            required
          />
        </div>
        <div >
          <label className="login-label" htmlFor="password">Password</label>
          <input className="login-inputs"
            onChange={handleChange}
            type="password"
            name="password"
            value={formValues.password}
            required
          />
        </div>
        <button className='login-btn' disabled={!formValues.username || !formValues.password}>
          Login
        </button>
      </form>
      
    </div>
  </div>
  )
}

export default Login