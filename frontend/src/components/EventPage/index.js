import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './index.css'

function mapStateToProps({ events }, { match: { params: { id } } }) {
	return { event: events.entries.get(id) }
}

function EventPage({ event }) {
	if (!event) {
		return <Redirect to='/events' />
	}

  return (
		<Container className="event-background">
			<Row>
				<Col xs={4}>
					<img alt='event' className="card-img-top" src={event.image} />
				</Col>
				<Col>
					<div><h1 className="event-name">{event.name}</h1></div>
					{/* REVIEW: this is a list */}
					<div><h2 className="event-organizer">{event.organisers}</h2></div>
				</Col>
			</Row>
			<hr className="hr-event"/>
			<Row>
				<Col><h3 className="event-desc">{event.description}</h3></Col>
			</Row>
			<hr className="hr-event"/>
			<Row>
				<Col><h4 className="event-date">{event.start_time.ToString}</h4></Col>
				<Col><h4 className="event-date">{event.end_time.ToString}</h4></Col>
			</Row>
			<hr className="hr-event"/>
			<Row>
				<Col><h5 className="event-count">{event.groups.length}</h5></Col>
				<Col><h5 className="event-count">{event.people.length}</h5></Col>
			</Row>
			<Row>
				<Col>
				{event.groups.map(group => (
					<h6 className="event-participant" key={group.name}>
						{group.name}
					</h6>
				))}
				</Col>
				<Col>
					{event.people.map(individual => (
						<h6 className="event-participant" key={individual.name}>
							{individual.name}
						</h6>
					))}
				</Col>
			</Row>
		</Container>
  )
}

export default connect(mapStateToProps)(EventPage)