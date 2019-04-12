import React from 'react'

export function useFetch(callback) {
  React.useEffect(() => {
    // not passing it because we do not want to return a promise to useEffect
    callback()
  }, [])
}