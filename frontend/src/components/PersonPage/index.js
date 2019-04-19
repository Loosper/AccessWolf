import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import { useFetch } from '../../util/hooks'
import { fetchLocation, fetchAttendances, fetchPeopleIfNeeded } from '../../actions/people'

// import { formatDate, toIDMap, hourFormat } from '../../util';
import HumanEntry from '../EventPage/HumanEntry';
// import groupedPeopleSelector from '../../selectors/groups';

// import './index.css'
import '../PeoplePage/index.css'

import { fetchGroupsIfNeeded } from '../../actions/groups';
import Attendance from './Attendance';

function mapStateToProps({ people, attendances, locations, groups }, { match: { params: { id } } }) {
	return { 
		person: people.getEntry(id),
		attendances: attendances.getEntry(id),
		location: locations.getEntry(id),
		groups: groups.entries
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPeople: () => dispatch(fetchPeopleIfNeeded()),
		fetchGroups: () => dispatch(fetchGroupsIfNeeded()),
		fetchAttendance: id => () => dispatch(fetchLocation(id)),
		fetchLocation: id => () => dispatch(fetchAttendances(id)),
	}
}

function PersonPage({ person, attendances, location, groups, fetchAttendance, fetchLocation, fetchGroups, fetchPeople, match: { params: { id } }, history: { push } }) {
	useFetch(
		fetchAttendance(id),
		fetchLocation(id),
		fetchGroups,	
		fetchPeople,
	)

	if (!person) {
		return null
	}
	
  return (
		<>
			<header>
				<img src={person.image} alt='event' />
				<h1>{person.name}</h1>
			</header>
			<label>Groups</label>
			<Row>
				{person.groups.map(group => groups.get(String(group))).map(group => group && (
					<HumanEntry key={group.id} {...group} />
				))}
			</Row>
			<label>Location</label>
			<Col>
			</Col>
			<label>Attendances</label>
			{attendances && attendances.events.map(x => (
				<Attendance key={x.id} {...x} />
			))}
			{/* <label>Room</label>
			<h5>{person.room.name}</h5>
			<label>Description</label>
			<p>{person.description}</p>
			<Row>
				<Col lg={2}>
					<label>From</label>
					<p>{formatDate(person.start)}</p>
				</Col>
				<Col lg={2}>
					<label>To</label>
					<p>{formatDate(person.end)}</p>
				</Col>
				<Col>
					<label>Duration</label>
					<p>{hourFormat(person.duration)}</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<label>Organisers</label>
					<Row>
						{person.organisers.map((person) => (
							<HumanEntry key={person.id} {...person} />
						))}
					</Row>
				</Col>
				<Col>
					<label>Invited</label>
					<Row>
						{person.people.map(entry => (
							<HumanEntry key={entry.id} {...entry} />
						))}
						{person.groups.map(group => (
							<HumanEntry key={group.id} {...group} onClick={() => push(`/group/${group.id}`)} />
						))}
					</Row>
				</Col>
			</Row>
			<Row>
				<Col>
					<label>At the event</label>
					<Row>
						{person.attendances.map(person => (
							<HumanEntry key={person.id} {...person} />
						))}
					</Row>
				</Col>
				<Col>
					<label>Not at the event</label>
					<Row>
						{missingPeople.map(person => (
							<HumanEntry key={person.id} {...person} />
						))}
					</Row>
				</Col>
			</Row> */}
		</>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonPage)
