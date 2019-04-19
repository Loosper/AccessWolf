import React from 'react'
import Row from 'react-bootstrap/Row'
import { formatDate } from '../../util';

import '../EventsPage/index.css'
import './index.css'

export default function Attendance({ title, start, late, attended }) {
  return (
    <Row className='attendance'>
      <h4>{title}</h4>
      <h5>{formatDate(start)}</h5>
      {late && <div className='label'>Late</div>}
      {!attended && <div className='label'>Skipped</div>}
    </Row>
  )
}
