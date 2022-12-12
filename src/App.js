import './index.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Venues from './components/Venues';
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CheckSession } from './services/Auth'
import ReviewForm from './components/ReviewForm';
import VenueDetails from './components/VenueDetails';

function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [selectedVenue, setSelectedVenue] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)

  
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} toggleAuthenticated={toggleAuthenticated}/>} />
          <Route path="/register" element={<Register />} />
          <Route path='/venues/:venue_id' element={<Venues authenticated={authenticated}/>} />
          <Route path='/venues/:venue_id' element={<VenueDetails selectedVenue={selectedVenue} authenticated={authenticated}/>}/>
          <Route path='/review-form/:venue_id' element={<ReviewForm user={user} authenticated={authenticated}/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;