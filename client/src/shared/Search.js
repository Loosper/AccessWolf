import React from 'react'
import { Row } from 'react-bootstrap';
import './Search.css'

export default function Search() {
  return (
    <Row className='search'>
		  <input placeholder='Search for an event...' />
		  <img alt='search' src='/static/media/magnifying-glass.037e78ed.svg' />
    </Row>
  )
}
