import React from 'react'
import { connect } from 'react-redux'

function mapStateToProps({ groups, people }) {
  const grouped = [...groups]

  for (const person of people) {
    for (const group of person.groups) {
      grouped[group].people = grouped[group].people || []
      grouped[group].people.push(person)
    }
  }

  return { groups: grouped, people }
}

function PeoplePage({ groups, people }) {
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

export default connect(mapStateToProps)(PeoplePage)