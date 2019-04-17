import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import EventPage from './EventPage'
import RoomsPage from './RoomsPage'
import Navbar from './shared/Navbar'
import EventsPage from './EventsPage'
import PeoplePage from './PeoplePage'
import GroupPage from './GroupPage'

import MenuIcon from './shared/MenuIcon'

function NotFound() {
  return <Redirect to='/events' />
}

const Routes = React.memo(() => (
  <Switch>
    <Route exact path='/events' component={EventsPage} />
    <Route exact path='/people' component={PeoplePage} />
    <Route exact path='/rooms' component={RoomsPage} />
    <Route exact path='/events/:id' component={EventPage} />
    <Route exact path='/group/:id' component={GroupPage} />
    <Route render={NotFound} />
  </Switch>
))

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
        <Routes />
      </div>
    </>
  )
}


export default App
