import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const VenueDetails = ({authenticated}) => {
  // let navigate = useNavigate()
  let {venue_id} = useParams()
  
  const [venue, setVenue]= useState('')
  const [reviewsVenue, setReviewsVenue] = useState('')
  const [eventsVenue, setEventsVenue] = useState('')

  const getVenue = async () => {
    const res = await axios.get(`http://localhost:3001/api/venue/${venue_id}`)
    setVenue(res.data)
    // console.log(res.data)
    let events = res.data.venue_event
    let reviews = res.data.venue_reviews
    console.log(reviews)
    setEventsVenue(events)
    setReviewsVenue(reviews)
    let newEvents = []
    let eventsVenue = []
    let reviewsVenue = []
  }
  
  useEffect(() => {
    getVenue()
  }, [])
  
  return (
    <div>
      <div className='getVenue'>
             
          <div className='venue list' key={venue.id}>
          <h1 className='venueName name'>Venue Name: {venue.name}</h1>
          <img className='venueImage image' alt='photo of the venue' src={venue.image}/>
          <h2 className='venueAddress address venueh2'>Venue Address: {venue.address}</h2>
          </div>
        
      </div>
      <div>
        <div className='getEvents'>
          <h1>Events at this Venue:</h1>
        {eventsVenue && (eventsVenue.map(event =>(
          <div className='events list' key={event.id}>
          <h3 className='venueName name'>Name: {event.Event.title}</h3>
          <h3 className='venueName name'>Description: {event.Event.description}</h3>
          <h3 className='venueName name'>Creator: {event.name}</h3>
          <button className='new-event-button button'>Add Your Event At This Venue</button>
          <br/>
          </div>
          )))}
        </div>
        <div className='getReviews'>
          <h1>Reviews for this Venue:</h1>
        {reviewsVenue && (reviewsVenue.map(review =>(
          <div className='reviews list' key={review.id}>
          <h3 className='venueName name'>Title: {review.Review.title}</h3>
          <h3 className='venueName name'>Review: {review.Review.review}</h3>
          <h3 className='venueName name'>username: {review.username}</h3>
          <br/>
          </div>
          )))}
        </div>
        </div>
    </div>
  )
}

export default VenueDetails
// let newVenueEvents = data.venue_event
// let newNewVenueEvents = newVenueEvents.Event
// newVenueEvents.forEach(newEvent => {
//   newEvents.push(newEvent)
  // console.log(newEvents)
  // let venueName = venue.name
  // let events = venue.venue_event
  // let reviews = venue.venue_reviews
  // console.log(events)
  // if (events.length>0){
  //   events.map(event => (
  //     eventsVenue.push(event.Event)
  //   ))
  // }
  // if (reviews.length>0){
  //   reviews.map(review => (
  //     reviewsVenue.push(review.Review)
  //   ))
  // } 
// });
//   if (!eventsVenue[0]) {
//     return null
//   } else
//   setEventsVenue(eventsVenue)
//   // console.log(eventsVenue)
//   if (!reviewsVenue[0]) {
//     return null
//   } else 
//   setReviewsVenue(reviewsVenue)
//   // console.log(reviewsVenue)