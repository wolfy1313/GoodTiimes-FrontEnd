import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Client from '../services/api'
import { BASE_URL } from '../services/api'


const PartyDetails = ({user}) => {
  let navigate = useNavigate()
  let {party_id, user_id} = useParams()
  
  const [party, setParty]= useState()
  const [commentsParty, setCommentsParty] = useState([])
  const [user_partyParty, setUser_PartyParty] = useState('')

  const getParty = async () => {
    let res = await axios.get(`http://localhost:3001/api/party/user/${party_id}`)
    console.log(res.data[0])
    setParty(res.data[0]);
    setCommentsParty(res.data[0].Comments)
  } 
  useEffect(() => {
    getParty()
  }, [])

  const addComment = () => {
    navigate(`/comment-form/${party_id}/${user_id}`)
  } 
  const deleteComment = async (idx) => {
    await Client.delete(`${BASE_URL}/api/comment/delete/${party.Comments[idx].id}`)
    getParty()
  }
  return (
    <div>
      <div className='animate__animated animate__slideInRight getParty'>            
          <div className='party list' key={party?.id}>
          <h1 className='partyName name '>Party Name: {party?.name}</h1>
          <h1 className='partyName name'>Party Date: {party?.date} | Party Time: {party?.time}</h1>
          <img className='partyImage image' alt='photo of the party' src={party?.image}/>
          <h2 className='partyAddress address partyh2'>Party Address: {party?.address}</h2>
          </div>
        
      </div>
      <div>
        <div className='getComments animate__animated animate__slideInUp'>
          <br/>
          <h1>Comments for this Party:</h1>
          <><button className='new-comment-button button' onClick={() => addComment()}>Add A Comment</button></>
        {!commentsParty ? 
          <h3>No Comments Yet</h3> : (commentsParty.map((comment, idx)=>(
          <div className='comments list' key={comment.id}>
          <h3 className='partyName name'>Comment: {comment.comment}</h3>
          <h3 className='partyName name'>username: {comment.username}</h3>
          
          <>{user?.id === comment.user_id &&
          <Link to={`/update-comment/${comment.party_id}/${comment.id}/`}>
            <button>Edit Comment</button>
            </Link>
          } </>
          <>{user?.id === comment.user_id &&
            <button onClick={() => deleteComment(idx)}>Delete Comment</button>
          } </>
          </div>
            )))}
            
          
          <br/>
          <br/>
        </div>
        </div>
    </div>
  )
}

export default PartyDetails