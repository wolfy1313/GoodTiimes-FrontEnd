import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'



const Register = ({authenticated}) => {

  const navigate = useNavigate()

  const initialFormValues = {
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  };


  const [formValues, setFormValues] = useState({initialFormValues})

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      name: formValues.name,
      username: formValues.username,
      password: formValues.password
    });
    setFormValues(initialFormValues);
    navigate('/login')

  }

  return (
    <div className="signin col">
        {authenticated ? <h1>You are already registered</h1> :
      <div className="card-overlay centered">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label className='form-label'>Name:  </label>
            <input className='form-input'
              onChange={handleChange}
              name="name"
              type="text"
              value={formValues.name}
              required
            />
          </div>
          <div className="input-wrapper">
            <label className='form-label'>Username:  </label>
            <input className='form-input'
              onChange={handleChange}
              name="username"
              type="text"
              value={formValues.username}
              required
            />
          </div>

          <div className="input-wrapper">
            <label className='form-label'>Password:  </label>
            <input className='form-input'
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <div className="input-wrapper">
            <label className='form-label'>Confirm Password:  </label>
            <input className='form-input'
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            />
          </div>
          <button className='form-button'
            disabled={
              !formValues.username ||
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
          >
            Register
          </button>
        </form>
      </div>
      }
    </div>
  )
}

export default Register