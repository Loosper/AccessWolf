import { getGroups } from '../util/api'

export const REQUEST_GROUPS = 'REQUEST_GROUPS'
function requestGroups() {
  return {
    type: REQUEST_GROUPS,
  }
}

export const RECEIVE_GROUPS = 'RECEIVE_GROUPS'
function receiveGroups(groups) {
  return {
    type: RECEIVE_GROUPS,
    groups,
  }
}

function shouldFetchGroups(state) {
  return !state.groups.isFetching
}

function fetchGroups() {
  return async dispatch => {
    dispatch(requestGroups())
    return receiveGroups(await getGroups())
  }
}

export function fetchGroupsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchGroups(getState())) {
      return dispatch(fetchGroups())
    } else {
      return Promise.resolve()
    }
  }
}
