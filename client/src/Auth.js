import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';


export function useAuth(authManager) {
  const [isAuthenticated, setAuthenticated] = useState(authManager.hasAuth())

  useEffect(() => {
    authManager.on('login', () => setAuthenticated(true))
    authManager.on('logout', () => setAuthenticated(false))
  }, [authManager])
  return isAuthenticated
}


export default function Auth(props) {
  return (
    <section className="section">
      <div className="container">
        <Router>
          <Switch>
            <Route path="/login" render={p => <Login {...p} authManager={props.authManager} />} />
            <Route path="/register" render={p => <Register {...p} authManager={props.authManager} />} />
            <Redirect path="/*" to="/login" />
          </Switch>
        </Router>
      </div>
    </section>
  )
}