import React from 'react'

import './index.css'

export default function Person({ person, onClick }) {
  return (
    <div key={person.id} className='person' onClick={onClick}>
      <img src={person.image} alt='group' />
      <h4>{person.name}</h4>
    </div>
  )
}
