import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'

import { useFetch } from '../../util/hooks'
import { connect } from 'react-redux'
import { fetchPeopleIfNeeded } from '../../actions/people'
import icons from './icons'
import './EventModal.css'
import PeopleChooser from './PeopleChooser';
import { fetchGroupsIfNeeded } from '../../actions/groups';
import { Popover, OverlayTrigger, Row } from 'react-bootstrap'
import { formatDate, hourFormat } from '../../util';
import { createEvent } from '../../util/api';
import { fetchRoomsIfNeeded } from '../../actions/rooms';
import RoomChooser from './RoomChooser';
import { fetchEventsIfNeeded } from '../../actions/events';

export const ModalContext = React.createContext({ open: void 0, close: void 0 })

function mapStateToProps({ groups, people, rooms }) {
  return {
    groups: groups.entries,
    people: people.entries,
    rooms: rooms.entries
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPeople: () => dispatch(fetchPeopleIfNeeded()),
    fetchGroups: () => dispatch(fetchGroupsIfNeeded()),
    fetchRooms: () => dispatch(fetchRoomsIfNeeded()),
    fetchEvents: () => dispatch(fetchEventsIfNeeded())
  }
}

const local = {
  "format": "DD-MM-YYYY HH:mm",
  "sundayFirst": false
}

const shit = {}

function EventModal({ fetchPeople, fetchGroups, fetchRooms, groups, people, rooms, fetchEvents }) {
  const { close, start, end, setStart, setEnd, show } = React.useContext(ModalContext)

  const [image, setImage] = React.useState(icons[0])
  const [organisers, setOrganisers] = React.useState(new Set())
  const [individuals, setIndividuals] = React.useState(new Set())
  const [invitedGroups, setInvitedGroups] = React.useState(new Set())
  const [room, setRoom] = React.useState(rooms.first() || {})

  if (!room.id && rooms.first()) {
    setRoom(rooms.first())
  }

  useFetch(fetchPeople, fetchGroups, fetchRooms)

  async function handleSubmit(event) {
    event.preventDefault()

    const { title, description } = event.target.elements

    const newEvent = {
      title: title.value,
      description: description.value,
      image,
      room: room.id,
      end: end.toDate().toISOString(),
      start: start.toDate().toISOString(),
      organisers: [...organisers.values()],
      people: [...individuals.values()],
      groups: [...invitedGroups.values()]
    }

    await createEvent(newEvent)
    fetchEvents()
    close()
  }

  const popover = (
    <Popover id="popover-basic" title={`Select event image`}>
      <Row className='avatars'>
        {icons.map(src => <img key={src} src={src} alt='yes' onClick={() => setImage(src)} />)}
      </Row>
    </Popover>
  )

  return (
    <Modal centered show={show} size="lg" enforceFocus={false}>
      <Modal.Header>
        <Modal.Title>Create a new event</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Row>
            <Col lg={7}>
              <Form.Label>Title</Form.Label>
              <Form.Control name='title' placeholder="Popping champaign..." />
              <Form.Label>Description</Form.Label>
              <Form.Control name='description' as="textarea" rows="9" placeholder='Describe some details about the upcoming event...' />
              <Row>
                <Col lg={2}>
                  <Form.Label>Image</Form.Label>
                  <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
                    <div className='chosen-row'>
                      <img src={image} alt='avatar' className='chosen' />
                    </div>
                  </OverlayTrigger>
                </Col>
                <RoomChooser rooms={rooms} selected={room} setSelected={setRoom} />
              </Row>
            </Col>
            <Col>
              <Form.Label>Timing</Form.Label>
              <DateTimeRangeContainer
                applyCallback={(start, end) => {
                  setStart(start)
                  setEnd(end)
                }}
                ranges={shit}
                start={start}
                end={end}
                local={local}
              >
                <Col className='range'>
                  <Row>
                    <label>From</label>
                    <p>{formatDate(start)}</p>
                  </Row>
                  <Row>
                    <label>To</label>
                    <p>{formatDate(end)}</p>
                  </Row>
                  <Row>
                    <label>Duration</label>
                    <p>{hourFormat(end.diff(start))}</p>
                  </Row>
                </Col>
              </DateTimeRangeContainer>
              <PeopleChooser
                people={people}
                selected={organisers}
                setSelected={setOrganisers}
                title='organisers'
              />
              <PeopleChooser
                people={people}
                selected={individuals}
                setSelected={setIndividuals}
                title='invited people'
              />
              <PeopleChooser
                people={groups}
                selected={invitedGroups}
                setSelected={setInvitedGroups}
                title='invited groups'
              />
            </Col>
            {/* {icons.map(src => <img src={src} alt='icon' />)} */}
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={close}>Dismiss</Button>
          <Button variant="success" type='submit'>Create</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventModal)
