import './index.css';
import Home from './components/Home';
import Register from './components/Register';
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CheckSession } from './services/Auth'

function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  
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
    //Reset all auth related state and clear localStorage
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }




  return (
    <div className="App">
      <Nav
        authenticated={authenticated}
        user={user}
        handleLogOut={handleLogOut}
      />
           <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} toggleAuthenticated={toggleAuthenticated}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed user={user} authenticated={authenticated}/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
