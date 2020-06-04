import React from 'react';

export default function Loader() {
  return (
    <section className="section">
      <progress className="progress is-large is-info" max="100" />
    </section>
  )
}