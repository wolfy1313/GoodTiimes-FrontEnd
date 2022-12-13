import React from 'react'
import Client from '../services/api'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewVenue = ({user}) => {
  const navigate = useNavigate()
  const initialFormValues = { name: '', address: '', image: ''}
  const [formValues, setFormValues] = useState(initialFormValues)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newVenueWithId = { ...formValues, user_id: user.id }
    await Client.post(`/api/venue`, newVenueWithId)
    .then((res) => {
      setFormValues(initialFormValues)
      navigate(`/home/${user.id}`)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  return (
    <div>
      <h1>Create a Party!</h1>
      <form onSubmit={handleSubmit}>
        <div className='create-venue-input-wrapper input-wrapper'>
          <label htmlFor='name'>Party Name:</label>
          <input
            onChange={handleChange}
            name="name"
            type="text"
            value={formValues.name} required
          />
          </div>
        <div className='create-venue-input-wrapper input-wrapper'>
          <label htmlFor='address'>Party Location:</label>
          <input
            onChange={handleChange}
            name="address"
            type="text"
            value={formValues.address} required
          />
          </div>
        <div className='create-venue-input-wrapper input-wrapper'>
          <label htmlFor='name'>Party Pic:</label>
          <input
            onChange={handleChange}
            name="image"
            type="text"
            value={formValues.image} 
          />
        </div>
        <button className='button add-venue-info-btn' type='submit'>Add Party</button>
      </form>
    </div>
  )
}

export default NewVenue