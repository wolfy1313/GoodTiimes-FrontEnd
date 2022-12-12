import React from 'react'
import { useState } from 'react'
// import Register from './components/Register';
// import Login from './components/Login';
// import ReviewForm from './ReviewForm';
// import VenueDetails from './VenueDetails';
// import Venues from './Venues';
import { Routes, Route, useNavigate } from 'react-router-dom'

const Home = ({toggleAuthenticated, authenticated, user, setUser, checkToken}) => {
  let navigate = useNavigate()

  const [selectedVenue, setSelectedVenue] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)


  return (

    <div className={authenticated ? "loggedInHome" : "loggedOutHome"}>
      <Routes>
        {/* <Route path='/login'
        element={<Login
        toggleAuthenticated={toggleAuthenticated}
        authenticated={authenticated}
        user={user}
      setUser={setUser}/>}>

      </Route> */}
      </Routes>

      <h1 className='pageTitle'>Welcome To Your Next Good Tiime</h1>
      <h2 className='homeh2'>Feel free to browse our venue list and their reviews and events.</h2>
      <h2 className='homeh2'>Register and Login to create a review or post an event!</h2>
    </div>
  )
}

export default Home

      // <section className='welcome-login'>
      //   <button onClick={() => navigate('/login')}>
      //   </button>
      // </section>