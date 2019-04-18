import React from 'react'

import './index.css'

export default function Person({ person }) {
  return (
    <div key={person.id} className='person'>
      <img src={person.image} alt='group' />
      <h4>{person.name}</h4>
    </div>
  )
}
