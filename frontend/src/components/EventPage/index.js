import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useFetch } from '../../util/hooks'
import { fetchEvent } from '../../actions/events'
import { fetchPeopleIfNeeded } from '../../actions/people'

import { formatDate, toIDMap, hourFormat } from '../../util'
import HumanEntry from './HumanEntry'
import groupedPeopleSelector from '../../selectors/groups'

import './index.css'
import '../PeoplePage/index.css'

import { fetchGroupsIfNeeded } from '../../actions/groups'

function mapStateToProps(state, { match: { params: { id } } }) {
	const { events, isFetching } = state

	return { 
		event: events.getEntry(id),
		grouped: groupedPeopleSelector(state),
		isFetching,
	}
}

const mapDispatchToProps = {
	fetchPeople: fetchPeopleIfNeeded,
	fetchGroups: fetchGroupsIfNeeded,
	fetchEvent: id => fetchEvent(id)
}

function EventPage({ event, isFetching, fetchPeople, fetchEvent, fetchGroups, grouped, match: { params: { id } }, history: { push } }) {
	const [hasFetched, setHasFetched] = React.useState(false)

	useFetch(
		async () => {
			await fetchEvent(id)
			setHasFetched(true)
		},
		fetchPeople,
		fetchGroups,
	)

	if (isFetching || !hasFetched) {
		return null
	}

	if (!event) {
		return <Redirect to='/events' />
	}

	const allInvitedPeople = toIDMap([
		...event.people,
		...event.groups.flatMap(group => grouped.get(String(group.id)).people || [])
	])

	const attendingMap = toIDMap(event.attendances)

	const missingPeople = allInvitedPeople.filterNot(person => attendingMap.has(String(person.id)))
		.valueSeq()
		.toArray()
	
  return (
		<>
			<header>
				<img src={event.image} alt='event' />
				<h1>{event.title}</h1>
			</header>
			<label>Room</label>
			<h5>{event.room.name}</h5>
			<label>Description</label>
			<p>{event.description}</p>
			<Row>
				<Col lg={4}>
					<label>From</label>
					<p>{formatDate(event.start)}</p>
				</Col>
				<Col lg={4}>
					<label>To</label>
					<p>{formatDate(event.end)}</p>
				</Col>
				<Col>
					<label>Duration</label>
					<p>{hourFormat(event.duration)}</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<label>Organisers</label>
					<Row>
						{event.organisers.map((person) => (
							<HumanEntry key={person.id} {...person} onClick={() => push(`/people/${person.id}`)} />
						))}
					</Row>
				</Col>
				<Col>
					<label>Invited</label>
					<Row>
						{event.people.map(entry => (
							<HumanEntry key={entry.id} {...entry} onClick={() => push(`/people/${entry.id}`)} />
						))}
						{event.groups.map(group => (
							<HumanEntry key={group.id} {...group} onClick={() => push(`/group/${group.id}`)} />
						))}
					</Row>
				</Col>
			</Row>
			<Row>
				<Col>
					<label>At the event</label>
					<Row>
						{event.attendances.map(person => (
							<HumanEntry key={person.id} {...person} onClick={() => push(`/people/${person.id}`)} />
						))}
					</Row>
				</Col>
				<Col>
					<label>Not at the event</label>
					<Row>
						{missingPeople.map(person => (
							<HumanEntry key={person.id} {...person} onClick={() => push(`/people/${person.id}`)} />
						))}
					</Row>
				</Col>
			</Row>
		</>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage)
