import React, { useEffect } from 'react'
import Client from '../services/api'
import axios from 'axios'
import { BASE_URL } from '../services/api'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateComment = ({user, authenticated, selectedComment}) => {
  const initialFormValues = {}
  const [formDetails, setFormDetails] = useState(initialFormValues)
  const navigate = useNavigate()
  const {comment_id, party_id} = useParams()

  const getComment = async () => {
    let res = await axios.get(`${BASE_URL}/api/comment/${comment_id}`)
    console.log(res.data)
    setFormDetails({...res.data})
  }


  const handleChange = (e) => {
    setFormDetails({...formDetails, [e.target.name]: e.target.value})
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedComment = {...formDetails}
    await Client.put(`api/comment/update/${comment_id}`, updatedComment)
    .then((res) => {
      setFormDetails(initialFormValues)
      navigate(`/parties/${user.id}/${party_id}`)
    })
    .catch((error) => {
      console.log(error)
    }) 
  }

  useEffect(() => {
    getComment()
  },[])

  return (
    <div>
    <section className='comment-form'>
      <h2>Update Your Comment!</h2>
      <form onSubmit={handleSubmit}>
        <input className='comment-input input'
        onChange={handleChange}
        name="comment"
        value={formDetails.comment}
        type="textarea"
        placeholder="comment"
        required
        />
        <input className='comment-input input'
        onChange={handleChange}
        name="username"
        value={formDetails.username}
        type="text"
        placeholder="username"
        required
        />
        <button type='submit' disabled={!formDetails.comment}>Submit Update</button>
      </form>
      </section>

  </div>
  )
}

export default UpdateComment