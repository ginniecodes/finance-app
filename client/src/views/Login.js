import React from 'react';

import logo from '../assets/logo.svg';

import { Link } from 'react-router-dom';

export default function Login(props) {
  function handleSubmit(evt) {
    evt.preventDefault()
    props.authManager.login(evt.currentTarget.email.value, evt.currentTarget.passwd.value)
    .then(console.log)
    .catch(console.warn);
  }

  return (
    <section className="section">
      <nav className="level">
        <header className="level-item has-text-centered"><h1 className="title">Iniciar Sesión</h1></header>
        <div className="level-item"><img src={logo} className="image is-128x128" alt="logo" /></div>
      </nav>
      <article className="section">
        <div className="columns">
          <div className="column is-2"></div>
          <div className="column">
            <form onSubmit={handleSubmit}>
              <div className="field is-horizontal">
                <div className="field-label is-large">
                  <label className="label">Correo</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input type="text" name="email" className="input is-large is-rounded" placeholder="janedoe@ejemplo.com" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-large">
                  <label className="label">Contraseña</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input type="password" name="passwd" className="input is-large is-rounded" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label">
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <button className="button is-primary is-large" type="submit">
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="column is-2"></div>
        </div>
      </article>
      <footer className="section has-text-centered">
        <Link to="/register" className="link is-info aside-link">Registrarse</Link>
      </footer>
    </section>
  )
}