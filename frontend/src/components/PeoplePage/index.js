import React from 'react'
import { connect } from 'react-redux'
import { fetchPeopleIfNeeded } from '../../actions/people';
import { fetchGroupsIfNeeded } from '../../actions/groups';
import { useFetch } from '../../util/hooks';

function mapStateToProps({ groups, people }) {
  const grouped = [...groups.entries.values()].map(group => ({ 
    ...group, 
    events: [],
  }))

  for (const person of people.entries.values()) {
    for (const group of person.groups) {
      grouped[group].people.push(person)
    }
  }

  return { 
    groups: grouped, 
    people: [...people.entries.values()],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPeople: () => dispatch(fetchPeopleIfNeeded()),
    fetchGroups: () => dispatch(fetchGroupsIfNeeded()),
  }
}

function PeoplePage({ groups, people, fetchPeople, fetchGroups }) {
  useFetch(fetchGroups)
  useFetch(fetchPeople)

  return (
    <>
      <h1>People & Groups</h1>
      <h2>Groups</h2>
      {groups.map(group => (
        <div key={group.id}>
          {JSON.stringify(group)}
        </div>
      ))}
      <h2>People</h2>
      {people.map(person => (
        <div key={person.id}>
          {JSON.stringify(groups)}
        </div>
      ))}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage)