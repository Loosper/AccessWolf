export function list(...classNames) {
  return classNames.filter(Boolean).join(' ')
}

export function toIDMap(entries) {
  if (!entries || (entries.length && !entries[0].id)) {
    throw new Error('Entries do not have id')
  }

  return entries.reduce((map, entry) => {
    map.set(entry.id, entry)
    return map
  }, new Map())
}