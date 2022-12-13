import React from 'react'
import Client from '../services/api'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NewParty = ({user}) => {
  const {user_id} = useParams()
  const navigate = useNavigate()
  const initialFormValues = { name: '', address: '', image: ''}
  const [formValues, setFormValues] = useState(initialFormValues)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newPartyWithId = { ...formValues, user_id: user_id }
    await Client.post(`/api/party`, newPartyWithId)
    .then((res) => {
      setFormValues(initialFormValues)
      navigate(`/home/${user_id}`)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  return (
    <div>
      <h1>Create a Party!</h1>
      <form onSubmit={handleSubmit}>
        <div className='create-party-input-wrapper input-wrapper'>
          <label htmlFor='name'>Party Name:</label>
          <input
            onChange={handleChange}
            name="name"
            type="text"
            value={formValues.name} required
          />
          </div>
        <div className='create-party-input-wrapper input-wrapper'>
          <label htmlFor='address'>Party Address:</label>
          <input
            onChange={handleChange}
            name="address"
            type="text"
            value={formValues.address} required
          />
          </div>
        <div className='create-party-input-wrapper input-wrapper'>
          <label htmlFor='date'>Party Date:</label>
          <input
            onChange={handleChange}
            name="date"
            type="text"
            value={formValues.date} required
          />
          </div>
        <div className='create-party-input-wrapper input-wrapper'>
          <label htmlFor='time'>Party Time:</label>
          <input
            onChange={handleChange}
            name="time"
            type="text"
            value={formValues.time} required
          />
          </div>
        <div className='create-party-input-wrapper input-wrapper'>
          <label htmlFor='name'>Party Pic:</label>
          <input
            onChange={handleChange}
            name="image"
            type="text"
            value={formValues.image} 
          />
        </div>
        <button className='button add-party-info-btn' type='submit'>Add Party</button>
      </form>
    </div>
  )
}

export default NewParty