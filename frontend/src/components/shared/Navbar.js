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

function Navbar({ location: { pathname }, isOpen, toggle }) {
  const [visibleBG] = pathname.substring(1).split('/')

  return (
    <nav className={list(isOpen && 'open')} onClick={toggle}>
      {pages.map(([pageName]) => (
        <div 
          key={pageName} 
          className={list(
            `bg ${pageName.substring(1)}-bg`, 
            visibleBG === pageName.substring(1) && 'visible'
          )} 
        />
      ))}
      <div className='menu'>
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
}

export default withRouter(Navbar)
