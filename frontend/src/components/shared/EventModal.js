import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import FormControl from 'react-bootstrap/FormControl'
import { useFetch } from '../../util/hooks'
import { connect } from 'react-redux'
import { fetchPeopleIfNeeded } from '../../actions/people'
import icons from './icons'
import moment from 'moment'
import './EventModal.css'
import PeopleChooser from './PeopleChooser';

export const ModalContext = React.createContext({ open: void 0, close: void 0 })

function mapStateToProps({ groups, people }) {
  return { 
    groups: groups.entries,
    people: people.entries,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPeople: () => dispatch(fetchPeopleIfNeeded()),
    fetchGroups: () => dispatch(fetchPeopleIfNeeded()),
  }
}

const now = new Date();
const start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
const end = moment(start).add(1, "days").subtract(1, "seconds");
const local = {
  "format": "DD-MM-YYYY HH:mm",
  "sundayFirst": false
}

function EventModal({ show, fetchPeople, fetchGroups, groups, people }) {
  useFetch(fetchPeople, fetchGroups)
  
  return (
    <ModalContext.Consumer>
      {({ close }) => (
        <Modal centered show={show} size="lg" enforceFocus={false}>
          <Modal.Header>
            <Modal.Title>Create a new event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Row>
              <Col>
                <Form.Label>Title</Form.Label>
                <Form.Control placeholder="Popping champaign..." />
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="5" />
              </Col>
              <Col>
                <DateTimeRangeContainer 
                  applyCallback={console.log}
                  start={start}
                  end={end}
                  local={local}
                >    
                  <FormControl
                    id="formControlsTextB"
                    type="text"
                    label="Text"
                    placeholder="Enter text"
                  /> 
                </DateTimeRangeContainer>
                <PeopleChooser people={people.valueSeq().toArray()} />
              </Col>
              {/* {icons.map(src => <img src={src} alt='icon' />)} */}
            </Form.Row>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={close}>Dismiss</Button>
            <Button variant="primary">Create</Button>
          </Modal.Footer>
        </Modal>
      )}
    </ModalContext.Consumer>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventModal)
