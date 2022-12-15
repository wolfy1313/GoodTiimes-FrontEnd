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
  await Client.post(`/api/comment/postComment`, newPartyCommentWithUserId)
    .then((res) => {
      setFormValues(initialState)
      navigate(`/parties/${user_id}/${party_id}`)
    })
    .catch((error) => {
      console.log(error)
    })
}

  return (
    <div className='form'>
      <section className='comment-section'>
        <h2 className="comment-header">Create a Comment!</h2>
        <form className='comment-form' onSubmit={handleSubmit}>
          <label className='form-label'>Username:  
          <input className='form-input input'
          onChange={handleChange}
          name="username"
          value={formValues.username}
          type="text"
          required
          /></label>
          <br/>
          <label className='form-label'>Comment:  
          <textarea className='form-textarea input'
          onChange={handleChange}
          name="comment"
          value={formValues.comment}
          required
          />
          </label>
          <br/>
          <button className='form-button' type='submit' disabled={!formValues.comment}>Submit Comment</button>
        </form>
        </section>

    </div>
  )
}

export default CommentForm