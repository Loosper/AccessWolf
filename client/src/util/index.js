export function list(...classNames) {
  return classNames.filter(Boolean).join(' ')
}
