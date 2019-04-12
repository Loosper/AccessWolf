export function list(...classNames) {
  return classNames.filter(Boolean).join(' ')
}

export function toIDMap(entries) {
  if (!entries[0] || !entries[0].id) {
    console.log(entries)
    throw new Error('Entries do not have id')
  }

  return entries.reduce((map, entry) => {
    map.set(entry.id, entry)
    return map
  }, new Map())
}