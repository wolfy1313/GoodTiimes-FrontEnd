import './index.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import NavBar from './components/NavBar';
import PartyDetails from './components/PartyDetails';
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CheckSession } from './services/Auth'
import CommentForm from './components/CommentForm';
import NewParty from './components/NewParty';


function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [userParty, setUserParty] = useState(null)
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
          <Route path="/home/:user_id" element={<Home user={user} authenticated={authenticated} userParty={userParty} checkToken={checkToken} setUserParty={setUserParty} userEvent={userEvent} setUserEvent={setUserEvent}/>} />
          <Route path="/login" element={<Login setUser={setUser} toggleAuthenticated={toggleAuthenticated}/>} />
          <Route path="/register" element={<Register authenticated={authenticated}/>} />
          <Route path='/parties/:user_id/:party_id' element={<PartyDetails user={user}authenticated={authenticated}/>} />
          <Route path='/comment-form/:party_id/:user_id' element={<CommentForm user={user} authenticated={authenticated} userParty={userParty} setUserParty={setUserParty}/>} />
          <Route path='/create-party/:user_id' element={<NewParty user={user} userParty={userParty} setUserParty={setUserParty}/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;