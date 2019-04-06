import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import './style.css'

const event = {
  id: 1,
  name: 'Math',
  description: 'wow so amazing',
	organizer: 'sa6ko',
  dateStart: new Date(),
  dateEnd: new Date(),
	image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
  groups: [{
    name: 'Tumor'
  }],
	individuals: [
		{ name: 'az' },
		{ name: 'ti' }
	]
}

export default function EventPage({ match: { params: { id } } }) {
  return (
		<Container className="event-background">
			<Row>
				<Col xs={4}>
					<img alt='event' class="card-img-top" src={event.image} />
				</Col>
				<Col>
					<div><h1 className="event-name">{event.name}</h1></div>
					<div><h2 className="event-organizer">{event.organizer}</h2></div>
				</Col>
			</Row>
			<hr className="hr-event"/>
			<Row>
				<Col><h3 className="event-desc">{event.description}</h3></Col>
			</Row>
			<hr className="hr-event"/>
			<Row>
				<Col><h4 className="event-date">{event.dateStart.ToString}</h4></Col>
				<Col><h4 className="event-date">{event.dateEnd.ToString}</h4></Col>
			</Row>
			<hr className="hr-event"/>
			<Row>
				<Col><h5 className="event-count">{event.groups.length}</h5></Col>
				<Col><h5 className="event-count">{event.individuals.length}</h5></Col>
			</Row>
			<Row>
				<Col>
				{event.groups.map(group => (
					<h6 className="event-participant">
						{group.name}
					</h6>
				))}
				</Col>
				<Col>
					{event.individuals.map(individuals => (
						<h6 className="event-participant">
							{individuals.name}
						</h6>
					))}
				</Col>
			</Row>
		</Container>
  )
}