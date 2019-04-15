import React from 'react'
import { connect } from 'react-redux'
import { fetchPeopleIfNeeded } from '../../actions/people'
import { fetchGroupsIfNeeded } from '../../actions/groups'
import { useFetch } from '../../util/hooks'
import { toIDMap } from '../../util'

function mapStateToProps({ groups, people }) {
  let grouped = null

  if (groups.entries.size && people.entries.size) {
    grouped = toIDMap([...groups.entries.values()])
    
    for (const person of people.entries.values()) {
      for (const group of person.groups) {
        grouped.get(group).people.push(person)
      }
    }
  }

  return { 
    groups: grouped ? [...grouped.values()] : [], 
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
  useFetch(fetchGroups, fetchPeople)

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