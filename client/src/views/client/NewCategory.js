import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { api } from '../../util';
import Loader from '../../components/Loader';

export default function NewCategory(props) {
  const [ loading, setLoading] = useState(false);
  function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true);
    api('/api/category', 'POST', {
      name: evt.currentTarget.name.value
    })
    .finally(() => setLoading(true));    
  }

  return (
    <section className="section">
      <header className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Agregar Categoría</h1>
            <h2 className="subtitle"><Link to="/categories" className="link">Volver</Link></h2>
          </div>
        </div>
      </header>
      {loading && <Loader />}
      <div className="columns">
        <div className="column is-2"></div>
        <div className="column">
          <section className="section">
            <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="field is-grouped">
                <p className="control is-expanded">
                  <input className="input is-large is-rounded" type="text" name="name" placeholder="Nombre" />
                </p>
                <p className="control">
                  <button className="button is-info is-large">Guardar</button>
                </p>
              </div>
            </form>
            </div>
          </section>
        </div>
        <div className="column is-2"></div>
      </div>
    </section>
  );
}