import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

const Home = ({toggleAuthenticated, authenticated, user, setUser, checkToken}) => {
  let navigate = useNavigate()
  const [venues, setVenues] = useState([])


  const getVenues = async () => {
    let res = await axios.get(`http://localhost:3001/api/venue`)
    console.log(res.data)
    setVenues(res.data)
  }
  console.log(user)
  
  useEffect(() => {
    getVenues()
  }, [])

  const showVenue = (venue) => {
    navigate(`/venues/${venue.id}`)
  }



  return (

    <div className={authenticated ? "loggedInHome" : "loggedOutHome"}>
         
        <h1 className='page-title'>Welcome To Your Next Good Tiime</h1>
        {!authenticated ? <h2 className='homeh2'>Register and Login to create a review or add yourself to the list of attendees!</h2> :  <h2>Welcome {user.name}!</h2>}
        <h2 className='homeh2'>Here's the list of upcoming shows.</h2>
      <div>
        {venues?.map((venue) => (
          <div className='venue-card' onClick={() => showVenue(venue)} key={venue.id}>
            <h1>{venue.name}</h1>
            <h2>{venue.address}</h2>
            <img className='venueImage image' alt='photo of the venue' src={venue.image}/>
          </div> 
        ))}
      
      </div>

    </div>
  )
}

export default Home