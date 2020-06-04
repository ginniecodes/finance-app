import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCategories } from '../../hooks';

import Loader from '../../components/Loader';

export default function Categories() {
  const [ reload, setReload ] = useState(true);
  const { loading, error, categories } = useGetCategories(reload, () => setReload(false));
  if (loading) return (<Loader />)
  if (error) return (<p>Error</p>)
  return (
    <article className="section">
      <header className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Categorías</h1>
            <h2 className="subtitle"><Link to="/categories/new" className="link">Agregar</Link></h2>
          </div>
        </div>
      </header>
      <section className="section">
        <div className="container">
          {categories.filter(c => c.type === 'default').map(c => <p className="subtitle">{c.name}</p>)}
          {categories.filter(c => c.type === 'personal').map(c => <p><Link to={`/categories/${c.id}/edit`} className="subtitle link">{c.name}</Link></p>)}
        </div>
      </section>
    </article>
  )
}