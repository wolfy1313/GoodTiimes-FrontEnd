import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const VenueDetails = ({user, authenticated}) => {
  // let navigate = useNavigate()
  let {venue_id} = useParams()
  
  const [show, setShow]= useState()
  const [reviewsVenue, setReviewsVenue] = useState('')
  const [eventsVenue, setEventsVenue] = useState('')

  useEffect(() => {
  const getShow = async () => {
    let res = await axios.get(`http://localhost:3001/api/venue/${venue_id}`)
    setShow(res.data[0])
    console.log(res.data)
    console.log(show)
    let events = res.data[0].venue_event
    // let reviews = res.data.venue_reviews
    // console.log(events)
    setEventsVenue(events)
    // setReviewsVenue(reviews)
    let newEvents = []
    let eventsVenue = []
    let reviewsVenue = []
  }
    getShow()
  }, [])

  const showUserReviews = () => {}
  
  
  return (
    <div>
      <div className='getVenue'>            
          <div className='venue list' key={show?.id}>
          <h1 className='venueName name'>show Name: {show?.name}</h1>
          <img className='venueImage image' alt='photo of the venue' src={show?.image}/>
          <h2 className='venueAddress address venueh2'>Venue Address: {show?.address}</h2>
          </div>
        
      </div>
      <div>
        <div className='getEvents'>
          <br/>
          <h1>Attendees:</h1>
          <br/>
        {eventsVenue && (eventsVenue.map(event =>(
          <div className='events list' key={event.id}>
          {/* <h3 className='venueName name'>Name: {event.Event.title}</h3>
          <h3 className='venueName name'>Description: {event.Event.description}</h3> */}
          <h3 className='venueName name'>Creator: {event.name}</h3>
          {!authenticated ? <br/>: 
          <button className='new-event-button button'>Add Your Event At This Venue</button>}
          <br/>
          <br/>
          </div>
          )))}
        </div>
        <div className='getReviews'>
          <h1>Reviews for this Venue:</h1>
          <br/>
        {reviewsVenue && (reviewsVenue.map(review =>(
          <div className='reviews list' key={review.id}>
          <h3 className='venueName name'>Title: {review.Review.title}</h3>
          <h3 className='venueName name'>Review: {review.Review.review}</h3>
          <h3 className='venueName name'>username: {review.username}</h3>
          {!authenticated ? <br/> :
          <button className='new-review-button button'>Add A Review</button>}
          <br/>
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