export default class Fetchable {
  static defaultState = { isFetching: false }

  setIsFetching(value) {
    return this.set('isFetching', value)
  }
}