import React from 'react'
import Row from 'react-bootstrap/Row'

export default function HumanEntry({ name, image, late, there, ...props }) {
  return (
    <div className='human-entry' {...props}>
      <img src={image} alt='hooman' />
      <Row>
        <h6>{name}</h6>
        {late && <div className='label'>Late</div>}
        {there === false && <div className='label'>Left</div>}
      </Row>
    </div>
  )
}
