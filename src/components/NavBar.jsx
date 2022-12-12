import React from 'react'
import { Link } from 'react-router-dom'


const NavBar = ({authenticated, user, handleLogOut}) => {

  return (
    <div className={authenticated ? "nav-div" : "loggedOutNavDiv"}>
      <h1>GOOD TIIMES</h1>
      <h5>-let the good tiimes roll-</h5>
      <h6 className={authenticated ? "logged-in-color" : "logged-out-color"}>{authenticated ? <Link onClick={handleLogOut}to="/">LogOut</Link> : <Link to="/login">Login</Link>} | <Link to="/register">Register</Link> | {authenticated ? <Link to={`/`}>Home</Link> : <Link to='/'>Home</Link>}</h6>
      <h3> </h3>
    </div>
  )
}

export default NavBar