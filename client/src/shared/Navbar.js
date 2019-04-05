import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import './Navbar.css'

const pages = [
  ['/events', 'Events'],
  ['/rooms', 'Rooms'],
  ['/people', 'People & Groups']
]

export default withRouter(function Navbar({ location: { pathname } }) {
  return (
    <navbar>
      {pages.map(([path, title]) => (
        <Link 
          key={path}
          to={path} 
          // eslint-disable-next-line no-undef
          className={list("navbar-button", path === pathname && 'selected')}
        >
          {title}
        </Link> 
      ))}
    </navbar>
  )
})
