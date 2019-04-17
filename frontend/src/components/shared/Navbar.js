import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router"
import { list } from '../../util'
import './Navbar.css'

const backgrounds = [
  ['events', 'events'],
  ['rooms', 'rooms'],
  ['people', 'people'],
  ['group', 'people']
]
const pages = [
  ['/events', 'Events'],
  ['/rooms', 'Rooms'],
  ['/people', 'People & Groups']
]

function Navbar({ location: { pathname }, isOpen, toggle }) {
  const [, visibleBG] = pathname.split('/')

  return (
    <nav className={list(isOpen && 'open')} onClick={toggle}>
      {backgrounds.map(([pageName, bg]) => (
        <div 
          key={pageName} 
          className={list(
            `bg ${bg}-bg`, 
            visibleBG === pageName && 'visible'
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
