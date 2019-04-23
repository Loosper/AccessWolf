import React from 'react'
import { Row } from 'react-bootstrap'
import { ReactComponent as SearchIcon } from '../../img/search.svg'
import './Search.css'

export default function Search(props) {

  return (
    <Row className='search'>
		  <input {...props} />
		  <SearchIcon />
    </Row>
  )
}
