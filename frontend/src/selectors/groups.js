import { createSelector } from 'reselect'

const groupedPeopleSelector = createSelector(
  state => state.people.entries,
  state => state.groups.entries,
  (people, groups) => groups.map(group => ({ ...group, people: [] })).withMutations(grouped => {
    if (grouped.size) {
      for (const [, person] of people) {
        for (const group of person.groups) {
          grouped.get(String(group)).people.push(person)
        }
      }
    }
  })
)

export default groupedPeopleSelector