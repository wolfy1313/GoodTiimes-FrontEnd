import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Client from '../services/api';


const CommentForm = ({user, authenticated}) => {
const {party_id} = useParams()
const {user_id} =useParams()
const navigate = useNavigate()
const initialState = { comment: '' };
const [formValues, setFormValues] = useState(initialState)

const handleChange = (e) => {
  setFormValues({ ...formValues, [e.target.name]: e.target.value})
}

const handleSubmit = async (e) => {
  e.preventDefault()
  let newPartyCommentWithUserId = {...formValues, party_id:party_id, user_id:user_id}
  await Client.post(`/api/postComment`, newPartyCommentWithUserId)
    .then((res) => {
      setFormValues(initialState)
      navigate(`/parties/${party_id}`)
    })
    .catch((error) => {
      console.log(error)
    })
}

  return (
    <div>
      <section className='comment-form'>
        <h2>Create a Comment!</h2>
        <form onSubmit={handleSubmit}>
          <input className='comment-input input'
          onChange={handleChange}
          name="comment"
          value={formValues.comment}
          type="text"
          placeholder="make a li'l comment about this party"
          required
          />
          <button type='submit' disabled={!formValues.comment}>Submit Comment</button>
        </form>
        </section>

    </div>
  )
}

export default CommentForm