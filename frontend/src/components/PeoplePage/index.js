import React from 'react'
import { connect } from 'react-redux'
import { fetchPeopleIfNeeded } from '../../actions/people'
import { fetchGroupsIfNeeded } from '../../actions/groups'
import { useFetch } from '../../util/hooks'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './index.css'

function mapStateToProps({ groups, people }) {
  return { 
    groups: groups.entries,
    people: people.entries,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPeople: () => dispatch(fetchPeopleIfNeeded()),
    fetchGroups: () => dispatch(fetchGroupsIfNeeded()),
  }
}

function PeoplePage({ groups, people, fetchPeople, fetchGroups, history: { push } }) {
  useFetch(fetchGroups, fetchPeople)

  return (
    <>
      <h1>People & Groups</h1>
      <h2>Groups</h2>
      <Row>
        {groups.valueSeq().toArray().map(group => (
          <div key={group.id} className='group' onClick={() => push(`/group/${group.id}`)}>
            <img src={group.image} alt='group' />
            <h4>{group.name}</h4>
          </div>
        ))}
      </Row>
      <h2>People</h2>
      <Col>
        {people.valueSeq().toArray().map(person => (
          <div key={person.id} className='person'>
            <img src={person.image} alt='group' />
            <h4>{person.name}</h4>
          </div>
        ))}
      </Col>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage)