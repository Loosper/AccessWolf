import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router"
import { list } from '../../util'
import './Navbar.css'

const pages = [
  ['/events', 'Events'],
  ['/rooms', 'Rooms'],
  ['/people', 'People & Groups']
]

export default withRouter(function Navbar({ location: { pathname }, isOpen, toggle }) {
  const visibleBG = pathname.substring(1)

  return (
    <nav className={list(isOpen && 'open')}>
      {pages.map(([pageName]) => (
        <div 
          key={pageName} 
          className={list(
            `bg ${pageName.substring(1)}-bg`, 
            visibleBG === pageName.substring(1) && 'visible'
          )} 
        />
      ))}
      <div className='menu' onClick={toggle}>
        {pages.map(([path, title]) => (
          <Link 
            key={path}
            to={path} 
            className={list("navbar-button", path === pathname && 'selected')}
          >
            {title}
          </Link> 
        ))}
      </div>
    </nav>
  )
})
