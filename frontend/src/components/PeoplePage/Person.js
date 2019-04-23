import React from 'react'

import './index.css'
import { list } from '../../util';

export default function Person({ person, onClick, selected }) {
  return (
    <div key={person.id} className={list('person', selected && 'person-selected')} onClick={onClick}>
      <img src={person.image} alt='group' />
      <h4>{person.name}</h4>
    </div>
  )
}
