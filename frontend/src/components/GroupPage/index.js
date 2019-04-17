import React from 'react'
import { connect } from 'react-redux'
import { useFetch } from '../../util/hooks';
import { fetchGroupsIfNeeded } from '../../actions/groups';
import { fetchPeopleIfNeeded } from '../../actions/people';
import groupedPeopleSelector from '../../selectors/groups';

import '../PeoplePage/index.css'

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

function GroupPage({ fetchGroups, fetchPeople, group, isFetching }) {
  useFetch(fetchGroups, fetchPeople)

  if (isFetching) {
    return null
  }

  return (
    <>
      <h1>{group.name}</h1>
      {/* <img src={group.image} alt='group' /> */}
      {group.people.map(person => (
        <div key={person.id} className='person'>
          <img src={person.image} alt='person' />
          <h4>{person.name}</h4>
        </div>
      ))}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage)