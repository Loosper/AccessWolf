import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import EventPage from './EventPage'
import EventsPage from './EventsPage'
import Navbar from './shared/Navbar'
import Search from './shared/Search'
import { ReactComponent as Menu } from '../img/menu.svg'

function NotFound() {
  return <Redirect to='/events' />
}

function App({ history }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <Router history={history}>
      <Navbar isOpen={isMenuOpen}/>
      <div className='view-container'>
        <Menu onClick={toggleMenu} />
        <Switch location={navigator.location}>
          <Route exact path='/events' component={EventsPage} />
          <Route exact path='/event/:id' component={EventPage} />
          <Route render={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
