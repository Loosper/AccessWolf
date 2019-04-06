import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import EventPage from './EventPage'
import EventsPage from './EventsPage'
import { Container } from 'react-bootstrap'
import Navbar from './shared/Navbar'
import Search from './shared/Search'

function NotFound() {
  return <Redirect to='/events' />
}

function App({ history }) {
  return (
    <Container>
      <Router history={history}>
        <Navbar />
        <Search />
        <Switch location={navigator.location}>
          <Route exact path='/events' component={EventsPage} />
          <Route exact path='/event/:id' component={EventPage} />
          <Route render={NotFound} />
        </Switch>
      </Router>
    </Container>
  )
}

export default App
