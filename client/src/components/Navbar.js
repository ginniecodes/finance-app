import React from 'react';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  const { admin } = props
  return (
    <nav id="navbar" className="level">
      <p className="level-item has-text-centered">
        <Link to="/" className="link is-info">Home</Link>
      </p>
      <p className="level-item has-text-centered">
        {admin ? <a className="link is-info">Clientes</a> : <Link to="/transactions" className="link is-info">Transacciones</Link> }
      </p>
      <header className="level-item has-text-centered">
        <img src={logo} alt="logo" className="logo" />
        <h1 className="title">Finanzas</h1>
      </header>
      <p className="level-item has-text-centered">
        {admin ? <a className="link is-info">Clientes</a> : <Link to="/categories" className="link is-info">Categorías</Link> }
      </p>
      <p className="level-item has-text-centered">
        <a className="button is-info" href="#" onClick={props.onLogout}>Salir</a>
      </p>
    </nav>
  )
}