import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'

const Home = ({authenticated, user}) => {
  let navigate = useNavigate()
  let {user_id} = useParams()
  const [parties, setParties] = useState([])

console.log(user)
  const getParties = async () => {
    let res = await axios.get(`http://localhost:3001/api/party`)
    console.log(res.data)
    setParties(res.data)
  }
  console.log(user)
  
  useEffect(() => {
    getParties()
  }, [])

  const showParty = (party) => {
    navigate(`/parties/${user_id}/${party.id}`)
  }



  return (

    <div className={authenticated ? "loggedInHome header" : "loggedOutHome header"}>
         
        <h1 className='page-title animate__animated animate__slideInRight'>Welcome To Your Next Good Time</h1>
        {!authenticated ? <h2 className='homeh2'>Register and Login to create a party and make a comment!</h2> :  
        
        <h2 className='welcome-user'>Welcome {user.username}!</h2>}
        <h2 className='homeh2'>Here's the list of upcoming parties.</h2>
      <div>
       
        {parties?.map((party) => (
           <div className='party-card' onClick={() => {{authenticated ? showParty(party) : <h1>You must be logged in</h1>}}} key={party.id}>
            <h1>{party.name}</h1>
            <h2>{party.date}</h2>
            <h2>{party.time}</h2>
            <h2>{party.address}</h2>
            <img className='partyImage image' alt='photo of the party' src={party.image}/>
          </div> 
        ))}
      
      </div>

    </div>
  )
}

export default Home