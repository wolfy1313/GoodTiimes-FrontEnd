import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Client from '../services/api';


const ReviewForm = ({user, authenticated}) => {
const {id} = useParams()
const navigate = useNavigate()
const initialState = { title: '', review: '' };
const [formValues, setFormValues] = useState(initialState)

const handleChange = (e) => {
  setFormValues({ ...formValues, [e.target.name]: e.target.value})
}

const handleSubmit = async (e) => {
  e.preventDefault()
  let newVenueReviewWithUserId = {...formValues, venue_id:id, user_id:user.id}
  await Client.post(`/api/postReview`, newVenueReviewWithUserId)
    .then((res) => {
      setFormValues(initialState)
      navigate(`/venues/${id}`)
    })
    .catch((error) => {
      console.log(error)
    })
}

  return (
    <div>
      <section className='review-form'>
        <h2>Create a Review!</h2>
        <form onSubmit={handleSubmit}>
          <input
          onChange={handleChange}
          name="review title"
          value={formValues.title}
          type="text"
          placeholder='sweet title for your review'
          required
          />
          <input
          onChange={handleChange}
          name='review'
          value={formValues.review}
          type="text"
          placeholder='sweet whole review here'
          required
          />
          <button type='submit' disabled={!formValues.title || !formValues.review}>Submit Review</button>
        </form>
        </section>

    </div>
  )
}

export default ReviewForm