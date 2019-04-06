import React from 'react'
import { Row } from 'react-bootstrap'
import { ReactComponent as SearchIcon } from '../../img/Search.svg'
import './Search.css'

export default function Search() {
  return (
    <Row className='search'>
		  <input placeholder='Search for an event...' />
		  <SearchIcon />
    </Row>
  )
}
