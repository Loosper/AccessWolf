import React from 'react'
import { Col, Popover, OverlayTrigger } from 'react-bootstrap'
import Person from '../PeoplePage/Person';
import Search from './Search'

export default function PeopleChooser({ people, selected, setSelected, title }) {
  const [search, setSearch] = React.useState('')

  const popover = (
    <Popover id="popover-basic" title={`Select ${title}`}>
      <Col>
        <Search value={search} onChange={e => setSearch(e.target.value)} placeholder={`Filter ${title}`} />
        {people.valueSeq()
          .toArray()
          .filter(x => search ? x.name.toLowerCase().includes(search.toLowerCase()) : true)
          .map(person => (
            <Person 
              key={person.id} 
              person={person} 
              selected={selected.has(person.id)} 
              onClick={() => setSelected(new Set(selected.has(person.id) 
                ? [...selected.values()].filter(x => x !== person.id)
                : [...selected.values(), person.id]
              ))} 
            />
          ))
        }
      </Col>
    </Popover>
  );
  
  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
      <div>
        <label>{title}</label>
        <div className='chosen-row'>
          {people.reduce((rendered, person) => {
            if (selected.has(person.id)) {
              rendered.push(person)
            }

            return rendered
          }, []).map(person => (
            <img key={person.id} src={person.image} alt='person' className='chosen' />
          ))}
          <div className='chosen'>+</div>
        </div>
      </div>
    </OverlayTrigger>
  )
}
