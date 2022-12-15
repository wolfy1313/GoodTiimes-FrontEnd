import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


const NavBar = ({authenticated, user, handleLogOut}) => {
  const { user_id } = useParams

  return (
    <div className={authenticated ? "nav-div" : "loggedOutNavDiv"}>
      <h1>GOOD TIMES</h1>
      <h5 className='home-subtitle animate__animated animate__slideInLeft' >-let the good times scroll-</h5>
          <h6 className={authenticated ? "logged-in-color" : "logged-out-color"}>{authenticated ? <Link onClick={handleLogOut}to="/">LogOut</Link> : <Link to="/login">Login</Link>} | {!authenticated ? <Link to="/register">Register</Link> : <Link to={`/create-party/${user.id}`}>Create Party</Link>} | {authenticated ? <Link to={`/home/${user.id}`}>Home</Link> : <Link to='/'>Home</Link>}</h6>
      <h3> </h3>
    </div>
  )
}

export default NavBar