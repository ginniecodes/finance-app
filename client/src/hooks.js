import { useEffect, useState } from 'react';
import { api } from './util';

export function useAdminInformation(authManager, reload, onReload) {
  const [admin, setAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if(reload) {
      authManager.load()
      .then(() => {
        setAdmin(authManager.isAdmin());
        onReload();
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
    }
  }, [reload]);

  return {
    admin,
    loading,
    error
  };
}


export function useBalance(reload, onReload) {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(false);

  function getBalance() {
    api('/api/balance')
    .then(res => setBalance(res.data.balance))
    .catch(err => setError(err.message))
    .finally(() => {
      onReload();
      setLoading(false)
    });
  }
  useEffect(() => {
    if(reload) {
      getBalance();
    }
    }, [reload]);

  return {
    balance,
    error,
    loading
  };
}

export function useGetTransactionExtras(reload, onReload) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(false);

  function getTransactionExtras() {
    return api('/api/currency')
    .then(res => {
      setCurrencies(res.data.currencies)
      return api('/api/category')
    })
    .then(res => setCategories(res.data.categories))
    .catch(err => setError(err.message))
    .finally(() => { setLoading(false); onReload(); });
  }

  useEffect(() => {
    if(reload) {
      getTransactionExtras();
    }
  }, [reload]);

  return {
    categories,
    currencies,
    error,
    loading,
  };
}

export function useGetCategories(reload, onReload) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  function getCategories() {
    return api('/api/category')
    .then(res => setCategories(res.data.categories))
    .catch(err => setError(err.message))
    .finally(() => { setLoading(false); onReload(); });
  }

  useEffect(() => {
    if(reload) {
      getCategories();
    }
  }, [reload]);

  return {
    categories,
    error,
    loading
  };
}