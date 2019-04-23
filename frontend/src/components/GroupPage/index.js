import React from 'react'
import { connect } from 'react-redux'
import { useFetch } from '../../util/hooks'
import { fetchGroupsIfNeeded } from '../../actions/groups'
import { fetchPeopleIfNeeded } from '../../actions/people'
import groupedPeopleSelector from '../../selectors/groups'

import Person from '../PeoplePage/Person'

function mapStateToProps(state, { match: { params: { id } } }) {
  const { groups, people } = state
  
  return {
    group: groupedPeopleSelector(state).get(id),
    isFetching: !groups.entries.size || (people.isFetching || groups.isFetching)
  }
}

const mapDispatchToProps = {
  fetchPeople: fetchPeopleIfNeeded,
  fetchGroups: fetchGroupsIfNeeded
}

function GroupPage({ fetchGroups, fetchPeople, group, isFetching, history: { push } }) {
  useFetch(fetchGroups, fetchPeople)

  if (isFetching) {
    return null
  }

  return (
    <>
      <header>
        <img src={group.image} alt='group' />
        <h1>{group.name}</h1>
      </header>
      {group.people.map(person => (
        <Person key={person.id} person={person} onClick={() => push(`/people/${person.id}`)} />
      ))}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage)