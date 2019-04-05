import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div class="navbar">
      <Link to='/events' class="navbar-button" id="events-button">
        Events
      </Link> 
      <Link to='/rooms' class="navbar-button">
        Rooms
      </Link>
      <Link to='/people' class="navbar-button">
        People
      </Link>
    </div>
  )
}
