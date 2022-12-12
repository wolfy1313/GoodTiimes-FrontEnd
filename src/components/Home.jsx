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
  
  useEffect(() => {
    getVenues()
  }, [])

  const showVenue = (venue) => {
    navigate(`/venues/${venue.id}`)
  }



  return (

    <div className={authenticated ? "loggedInHome" : "loggedOutHome"}>
      <h1 className='page-title'>Welcome To Your Next Good Tiime</h1>
      <h1 className='page-title'>Venues</h1>
      <h2 className='homeh2'>Feel free to browse our venue list and their reviews and events.</h2>
      <h2 className='homeh2'>Register and Login to create a review or post an event!</h2>
      <div>
        {venues?.map((venue) => (
          <div className='venue-card' onClick={() => showVenue(venue)} key={venue.id}>
            <h1>{venue.name}</h1>
            <h2>{venue.address}</h2>
            <img className='venueImage image' alt='photo of the venue' src={venue.image}/>
            {/* <h2>{venue.venue_reviews[0]}</h2> */}
          </div>
        ))}
      </div>

    </div>
  )
}

export default Home