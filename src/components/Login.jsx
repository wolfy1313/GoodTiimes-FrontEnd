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
    navigate(`/home/${payload.id}`)
  }
  // console.log(user)
  return (
    <div className="login-page">
    <div className="login-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Username:  </label>
          <input className="form-input"
            onChange={handleChange}
            name="username"
            type="text"
            value={formValues.username}
            required
          />
        </div>
        <div >
          <label className="login-label form-label">Password:  </label>
          <input className="login-inputs form-input"
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