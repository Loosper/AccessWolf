import React from 'react'
import { Col, Popover, OverlayTrigger } from 'react-bootstrap'
import Search from './Search'

export default function RoomChooser({ rooms, selected, setSelected }) {
  const [search, setSearch] = React.useState('')

  const popover = (
    <Popover id="popover-basic" title={`Select rooms`}>
      <Col>
        <Search value={search} onChange={e => setSearch(e.target.value)} placeholder={`Filter rooms`} />
        {rooms.valueSeq()
          .toArray()
          .filter(x => search ? x.name.toLowerCase().includes(search.toLowerCase()) : true)
          .map(room => (
            <h5 key={room.id} onClick={() => setSelected(room)}>{room.name}</h5>
          ))
        }
      </Col>
    </Popover>
  );
  
  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
      <Col>
        <label>Room</label>
        <h5>
          {selected.name}
        </h5>
      </Col>
    </OverlayTrigger>
  )
}
