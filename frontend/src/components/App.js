import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import EventPage from './EventPage'
import RoomsPage from './RoomsPage'
import Navbar from './shared/Navbar'
import EventsPage from './EventsPage'
import PeoplePage from './PeoplePage'

import MenuIcon from './shared/MenuIcon'

function NotFound() {
  return <Redirect to='/events' />
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <Navbar isOpen={isMenuOpen} toggle={toggleMenu} />
      <div className='view-container'>
        <MenuIcon onClick={toggleMenu} toggle={isMenuOpen} />
        <Switch location={navigator.location}>
          <Route exact path='/events' component={EventsPage} />
          <Route exact path='/people' component={PeoplePage} />
          <Route exact path='/rooms' component={RoomsPage} />
          <Route exact path='/event/:id' component={EventPage} />
          <Route render={NotFound} />
        </Switch>
      </div>
    </>
  )
}

export default App
