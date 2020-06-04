import React, { useState } from 'react';
import { useBalance } from "../../hooks";
import Loader from '../../components/Loader';

import TransactionForm from '../../components/TransactionForm';

export default function Transactions() {
  const [reload, setReload] = useState(true);
  const { loading, error, balance } = useBalance(reload, () => setReload(false));

  if (loading) return (<Loader />)
  if (error) return (<p>Error</p>)
  return (
    <article className="section">
      <header className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Transacciones</h1>
            <h2 className="subtitle">Balance: {balance}</h2>
          </div>
        </div>
      </header>
      <section className="section">
        <div className="container">
          <TransactionForm />
        </div>
      </section>
    </article>
  )
}