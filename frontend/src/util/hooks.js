import React from 'react'

export function useFetch(...callbacks) {
  React.useEffect(() => {
    callbacks.forEach(cb => cb())
  }, [])
}