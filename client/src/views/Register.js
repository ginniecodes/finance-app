import React, { useState } from 'react';

import logo from '../assets/logo.svg';
import "react-datepicker/dist/react-datepicker.css";

import { Link } from 'react-router-dom';

import Datepicker from 'react-datepicker';

export default function Register(props) {
  console.log(props.authManager);
  const [date, setDate] = useState(new Date());
  const [info, setInfo] = useState(null);

  function updateInfo(data) {
    setInfo(data);
    setTimeout(() => setInfo(null), 3000);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.authManager.register({
      fullName: evt.currentTarget.name.value,
      email: evt.currentTarget.email.value,
      password: evt.currentTarget.passwd.value,
      birthdate: date
    })
    .then(() => updateInfo({ success: true, message: "¡Registro exitoso!" }))
    .catch(() => updateInfo({ success: false, message: "Ha ocurrido un error" }));
  }

  return (
    <section className="section">
      <nav className="level">
        <header className="level-item has-text-centered"><h1 className="title">Registrarse</h1></header>
        <div className="level-item"><img src={logo} className="image is-128x128" alt="logo" /></div>
      </nav>
      <article className="section">
        {!!info && (<div className={`notification ${info.success ? 'is-info' : 'is-danger'}`}>{info.message}></div>)}
        <div className="columns">
          <div className="column is-2"></div>
          <div className="column">
            <form onSubmit={handleSubmit}>
            <div className="field is-horizontal">
                <div className="field-label is-large">
                  <label className="label">Nombre</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input type="text" name="name" className="input is-large is-rounded" placeholder="Jane Doe" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-large">
                  <label className="label">Cumpleaños</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <Datepicker className="input is-large is-rounded" selected={date} onChange={newDate => setDate(newDate)} />
                    </div>
                  </div>
                </div>
              </div>
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
        <Link to="/login" className="link is-info aside-link">Iniciar Sesión</Link>
      </footer>
    </section>
  )
}
