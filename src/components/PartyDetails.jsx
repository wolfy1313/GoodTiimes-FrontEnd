import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const PartyDetails = ({user, authenticated}) => {
  // let navigate = useNavigate()
  let {party_id} = useParams()
  
  const [show, setShow]= useState()
  const [commentsParty, setReviewsParty] = useState('')
  const [user_partyParty, setUser_PartyParty] = useState('')

  useEffect(() => {
  const getShow = async () => {
    let res = await axios.get(`http://localhost:3001/api/party/${party_id}`)
    setShow(res.data[0])
    console.log(res.data)
    console.log(show)
    let user_party = res.data[0].party_event
    // let comments = res.data.party_comments
    // console.log(user_party)
    setUser_PartyParty(user_party)
    // setReviewsParty(comments)
    let newUser_Party = []
    let user_partyParty = []
    let commentsParty = []
  }
    getShow()
  }, [])

  const showUserReviews = () => {}
  
  
  return (
    <div>
      <div className='getParty'>            
          <div className='party list' key={show?.id}>
          <h1 className='partyName name'>show Name: {show?.name}</h1>
          <img className='partyImage image' alt='photo of the party' src={show?.image}/>
          <h2 className='partyAddress address partyh2'>Party Address: {show?.address}</h2>
          </div>
        
      </div>
      <div>
        {/* <div className='getUser_Party'>
          <br/>
          <h1>Attendees:</h1>
          <br/>
        {user_partyParty && (user_partyParty.map(event =>(
          <div className='user_party list' key={user_party.id}>
          <h3 className='partyName name'>Creator: {event.name}</h3>
          {!authenticated ? <br/>: 
          <button className='new-event-button button'>Add Your Comment About This Party</button>}
          <br/>
          <br/>
          </div>
          )))}
        </div> */}
        <div className='getComments'>
          <h1>Reviews for this Party:</h1>
          <br/>
        {commentsParty && (commentsParty.map(comment =>(
          <div className='comments list' key={comment.id}>
          <h3 className='partyName name'>Comment: {comment.Comment.comment}</h3>
          <h3 className='partyName name'>username: {comment.username}</h3>
          {!authenticated ? <br/> :
          <button className='new-comment-button button'>Add A Comment</button>}
          <br/>
          <br/>
          </div>
          )))}
        </div>
        </div>
    </div>
  )
}

export default PartyDetails
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