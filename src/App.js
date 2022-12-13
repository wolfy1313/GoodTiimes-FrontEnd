import './index.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import NavBar from './components/NavBar';
import VenueDetails from './components/VenueDetails';
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CheckSession } from './services/Auth'
import ReviewForm from './components/ReviewForm';
import NewVenue from './components/NewVenue';


function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [userVenue, setUserVenue] = useState(null)
  const [userEvent, setUserEvent] = useState(null)

  
  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])
  
  const handleLogOut = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }




  return (
    <div className="App">
      <NavBar
        authenticated={authenticated}
        user={user}
        handleLogOut={handleLogOut}
      />
           <main>
        <Routes>
          <Route path="/" element={<Home user={user} authenticated={authenticated} />} />
          <Route path="/home/:user_id" element={<Home user={user} authenticated={authenticated} userVenue={userVenue} checkToken={checkToken} setUserVenue={setUserVenue} userEvent={userEvent} setUserEvent={setUserEvent}/>} />
          <Route path="/login" element={<Login setUser={setUser} toggleAuthenticated={toggleAuthenticated}/>} />
          <Route path="/register" element={<Register authenticated={authenticated}/>} />
          <Route path='/venues/:venue_id' element={<VenueDetails user={user}authenticated={authenticated}/>} />
          <Route path='/review-form/:venue_id' element={<ReviewForm user={user} authenticated={authenticated}/>} />
          <Route path='/create-party' element={<NewVenue user={user}/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;