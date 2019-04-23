import React from 'react'
import { Col, Popover, OverlayTrigger } from 'react-bootstrap';
import Person from '../PeoplePage/Person';
import Search from './Search'

export default function PeopleChooser({ people, select }) {
  const [search, setSearch] = React.useState('')
  const [selected, setSelected] = React.useState(new Set())

  const popover = (
    <Popover id="popover-basic" title="Popover right">
      <Col>
        <Search value={search} onChange={e => setSearch(e.target.value)} />
        {people.filter(x => search ? x.name.toLowerCase().includes(search.toLowerCase()) : true).map(person => (
          <Person key={person.id} person={person} onClick={() => setSelected(new Set(selected.has(person.id) 
            ? [...selected.values()].filter(x => x !== person.id)
            : [...selected.values(), person.id]
            ))} />
          ))}
      </Col>
    </Popover>
  );
  
  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <div>Click me to see</div>
    </OverlayTrigger>
  )
}
