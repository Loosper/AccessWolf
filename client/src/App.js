import React from 'react';
import './App.css';
import { Router, Switch, Route, Link } from 'react-router-dom';
import EventPage from './EventPage';
import EventsPage from './EventsPage';

function App({ history }) {
  return (
    <Router history={history}>
      <div>
        {['/events', '/event/1'].map(x => (
          <div>
            <Link to={x}>
              {x}
            </Link>
          </div>
        ))}
      </div>
      <Switch location={navigator.location}>
        <Route exact path='/events' component={EventsPage} />
        <Route exact path='/event/:id' component={EventPage} />
        <Route component={EventsPage} />
      </Switch>
    </Router>
  );
}

export default App;
