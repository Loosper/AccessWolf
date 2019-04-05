import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './style.css'

const events = [
  {
    id: 1,
    name: 'Math',
    description: 'wow so amazing',
	organizer: 'sa6ko',
	description: 'yesyesyesrak',
    dateStart: new Date(),
    dateEnd: new Date(),
	image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    groups: [{
      name: 'Tumor'
    }],
	individuals: [
		{name: 'az'},
		{name: 'ti'}
	]},
  {
    id: 2,
    name: 'Bel',
    description: 'wow so amazing',
	organizer: 'sa6ko',
	description: 'yesyesyesrak',
    dateStart: new Date(),
    dateEnd: new Date(),
	image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    groups: [{
      name: 'Tumor'
    }]
  }
];

export default function EventPage({ match: { params: { id } } }) {
  return (
	<Container className="event-background">
	
	<Row>
		<Col xs={4}>
			<img class="card-img-top" src={events[0].image} />
		</Col>
		<Col>
			<div><h1>{events[0].name}</h1></div>
			<div><h2>{events[0].organizer}</h2></div>
		</Col>
	</Row>
	
	<hr/>
	
	<Row>
		<Col><h3>{events[0].description}</h3></Col>
	</Row>
	
	<hr/>
	
	<Row>
		<Col><h4>{events[0].dateStart.ToString}</h4></Col>
		<Col><h4>{events[0].dateEnd.ToString}</h4></Col>
	</Row>
	
	<hr/>
	
	<Row>
		<Col><h5>{events[0].groups.length}</h5></Col>
		<Col><h5>{events[0].individuals.length}</h5></Col>
	</Row>
	
	<Row>
		<Col>
		{events[0].groups.map(group => (
			<h6>
				{group.name}
			</h6>
		))}
		</Col>
		<Col>
			{events[0].individuals.map(individuals => (
				<h6>
					{individuals.name}
				</h6>
			))}
		</Col>
	</Row>
	</Container>
  )
}