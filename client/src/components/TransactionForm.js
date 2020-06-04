import React, { useState } from 'react';
import { useGetTransactionExtras } from '../hooks';
import Loader from './Loader';

export default function TransactionForm() {
  const [ reload, setReload ] = useState(true);
  const { loading, error, categories, currencies} = useGetTransactionExtras(reload, () => setReload(false));
  if(loading) return (<Loader />);
  return (
    <form>
      <div className="columns">
        <div className="column is-2">
          <select>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
        </div>
        <div className="column">
          <div className="field has-addons">
            <p className="control">
              <span className="select">
                <select>
                  {currencies.map(c => <option key={c.id} value={c.id}>{c.symbol}</option>)}
                </select>
              </span>
            </p>
            <p className="control">
              <input className="input" type="number" placeholder="Monto" />
            </p>
            <p class="control">
              <a class="button is-info">
                Añadir
              </a>
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}