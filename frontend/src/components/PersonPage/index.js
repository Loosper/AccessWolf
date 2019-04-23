import React from 'react'
import { Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useFetch } from '../../util/hooks'
import { fetchLocation, fetchAttendances, fetchPeopleIfNeeded } from '../../actions/people'
import { format } from 'timeago.js'
import HumanEntry from '../EventPage/HumanEntry'

import './index.css'
import '../PeoplePage/index.css'

import { fetchGroupsIfNeeded } from '../../actions/groups'
import Attendance from './Attendance'

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
					<HumanEntry key={group.id} {...group} onClick={() => push(`/group/${group.id}`)} />
				))}
			</Row>
			{location && (
				<>
					<label>Location</label>
					<Row className='attendance'>
						<h4>Last seen</h4>
						<h5>{format(location.lastSeen)}</h5>
					</Row>
					<Row className='attendance'>
						<h4>Room</h4>
						<h5>{location.name}</h5>
						{!location.active && <div className='label'>Left</div>}
					</Row>
				</>
			)}
			<label>Attendances</label>
			{attendances && attendances.events.map(x => (
				<Attendance key={x.id} {...x} />
			))}
		</>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonPage)
