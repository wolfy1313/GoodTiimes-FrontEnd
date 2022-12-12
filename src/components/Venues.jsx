import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const Venues = ({authenticated}) => {
  // let navigate = useNavigate()
  // let {id} = useParams()
  
  const [venues, setVenues]= useState([])
  const [reviewsVenue, setReviewsVenue] = useState([])
  const [eventsVenue, setEventsVenue] = useState([])

  const getVenues = async () => {
    const res = await axios.get(`http://localhost:3001/api/venue`)
    setVenues(res.data)
    let data = res.data
    let venueEvents = []
    let eventsVenue = []
    let reviewsVenue = []
    data.forEach(venue => {
      venueEvents.push(venue.name && venue.venue_event && venue.venue_reviews)
      let venueName = venue.name
      let events = (venue.venue_event)
      let reviews = venue.venue_reviews
      console.log(events)
      if (events.length>0){
        events.map(event => (
          eventsVenue.push(event.Event)
        ))
      }
      if (reviews.length>0){
        reviews.map(review => (
          reviewsVenue.push(review.Review)
        ))
      } 
    });
    if (!eventsVenue[0]) {
      return null
    } else
    setEventsVenue(eventsVenue)
    // console.log(eventsVenue)
    if (!reviewsVenue[0]) {
      return null
    } else 
    setReviewsVenue(reviewsVenue)
    // console.log(reviewsVenue)
  }

  useEffect(() => {
    getVenues()
  }, [])

  return (
    <div>
      <div className='getVenues'>
        {venues && (venues.map(venue => (
          <div className='venues list' key={venue.id}>
          <h1 className='venueName name'>Venue Name: {venue.name}</h1>
          <img className='venueImage image' alt='photo of the venue' src={venue.image}/>
          <h2 className='venueAddress address venueh2'>Venue Address: {venue.address}</h2>
          </div>
        )))}
      </div>
      <div>
        <div className='getEvents'>
        {eventsVenue && (eventsVenue.map(event =>(
          <div className='events list' key={event.id}>
          <h1 className='venueName name'>EVENTEVENTEVENT Name: {event.title}</h1>
          </div>
          )))}
        </div>
        </div>
    </div>
  )
}

export default Venues