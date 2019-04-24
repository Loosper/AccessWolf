import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import EventPage from './EventPage'
import RoomsPage from './RoomsPage'
import Navbar from './shared/Navbar'
import EventsPage from './EventsPage'
import PeoplePage from './PeoplePage'
import GroupPage from './GroupPage'
import PersonPage from './PersonPage'
import MenuIcon from './shared/MenuIcon'
import EventModal, { ModalContext } from './shared/EventModal'
import moment from 'moment'
import { ReactComponent as Logo } from '../img/logo.svg'

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
    <Route exact path='/people/:id' component={PersonPage} />
    <Route render={NotFound} />
  </Switch>
))

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [start, setStart] = React.useState(moment())
  const [end, setEnd] = React.useState(moment(start).add(1, "hours"))
  const [modalKey, setModalKey] = React.useState(0)

  const modalContext = {
    open: event => {
      if (!isModalOpen) {
        event.start && setStart(moment(event.start))
        event.end && setEnd(moment(event.end))
        setIsModalOpen(true)
        setModalKey(modalKey + 1)
      }
    },
    close: () => {
      isModalOpen && setIsModalOpen(false)
    },
    show: isModalOpen,
    start,
    end,
    setStart,
    setEnd
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <Navbar isOpen={isMenuOpen} toggle={toggleMenu} />
      <div className='view-container'>
        <MenuIcon onClick={toggleMenu} toggle={isMenuOpen} />
        <ModalContext.Provider value={modalContext}>
          <Routes />
          <EventModal key={modalKey} />
        </ModalContext.Provider>
        <div className='logo'>
          <h1>Access Wolf</h1>
          <Logo />
        </div>
      </div>
    </>
  )
}


export default App
