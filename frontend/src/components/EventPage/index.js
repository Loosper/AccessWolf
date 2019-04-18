import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useFetch } from '../../util/hooks'
import { fetchEvent } from '../../actions/events'

import './index.css'
import Person from '../PeoplePage/Person';

function mapStateToProps({ events, isFetching }, { match: { params: { id } } }) {
	return { 
		event: events.getEntry(id),
		isFetching,
	}
}

function EventPage({ event, isFetching, match: { params: { id } }, dispatch }) {
	const [hasFetched, setHasFetched] = React.useState(false)

	useFetch(async () => {
		await dispatch(fetchEvent(id))
		setHasFetched(true)
	})

	if (isFetching || !hasFetched) {
		return null
	}

	if (!event) {
		return <Redirect to='/events' />
	}

  return (
		<>
			<header>
				<img src={event.image} alt='event' />
				<h1>{event.title}</h1>
			</header>
			<p>{event.description}</p>
			<Row>
				<h4>Organisers</h4>
				{event.organisers.map(person => (
					<Person key={person.id} person={person} />
				))}
			</Row>
			<Row>
				<h4>Invited</h4>
				{event.people.map(person => (
					<Person key={person.id} person={person} />
				))}
			</Row>
		</>
  )
}
/* 
{"id":4,"people":[{"id":2,"name":"Mike"}],"groups":[{"id":3,"name":"Football","image":"https://image.flaticon.com/icons/svg/201/201583.svg"}],"room":{"id":3,"name":"Stadium Ultra"},"organisers":[{"id":3,"name":"Katya"}],"title":"Grande finale","description":"Buckle up and start your engines, 'cuz it's about to get real y'all 👏👏👏","image":"https://image.flaticon.com/icons/svg/861/861506.svg","start":"2019-04-30T12:00:00Z","end":"2019-04-30T18:00:00Z"}
*/
export default connect(mapStateToProps)(EventPage)