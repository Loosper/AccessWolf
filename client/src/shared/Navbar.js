import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <Link to='/events'>
        Events
      </Link> 
      <Link to='/rooms'>
        Rooms
      </Link>
      <Link to='/people'>
        People
      </Link>
    </div>
  )
}
