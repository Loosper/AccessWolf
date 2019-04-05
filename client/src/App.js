import React from 'react';
import './App.css';
import { Router, Switch, Route, Link } from 'react-router-dom';
import EventPage from './EventPage';
import EventsPage from './EventsPage';
import { Container } from 'react-bootstrap';
import Navbar from './shared/Navbar';
import Search from './shared/Search';

function App({ history }) {
  return (
    <Container>
      <Router history={history}>
        <Navbar />
        <Search />
        <Switch location={navigator.location}>
          <Route exact path='/events' component={EventsPage} />
          <Route exact path='/event/:id' component={EventPage} />
          <Route component={EventsPage} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
