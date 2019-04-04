import React from 'react';

export default function EventPage({ match: { params: { id } } }) {
  return (
    <div>
      Events {id}
    </div>
  )
}