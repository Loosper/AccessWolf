import React from 'react'
import { Row } from 'react-bootstrap'
import { ReactComponent as SearchIcon } from '../../img/search.svg'
import './Search.css'

export default function Search({ value, onChange }) {
  
  return (
    <Row className='search'>
		  <input value={value} onChange={onChange} />
		  <SearchIcon />
    </Row>
  )
}
