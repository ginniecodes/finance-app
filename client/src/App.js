import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { useAdminInformation } from './hooks';

import './assets/components.css';

import ClientHome from './views/client/Home';
import AdminHome from './views/admin/Home';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Transactions from './views/client/Transactions';
import Categories from './views/client/Categories';
import NewCategory from './views/client/NewCategory';
import EditCategory from './views/client/EditCategory';

function App(props) {
  const [ reload, setReload ] = useState(true);
  const { loading, error, admin } = useAdminInformation(props.authManager, reload, () => setReload(false));
  if (loading) return (<Loader />);

  if(error) return (<p>error</p>);

  const AdminSwitch = (
    <Switch>
      <Route path="/" component={AdminHome} />
      <Redirect path="/*" to="/" />
    </Switch>
  );
  const ClientSwitch = (
    <Switch>
      <Route exact path="/" component={ClientHome} />
      <Route path="/transactions" component={Transactions} />
      <Route exact path="/categories" component={Categories} />
      <Route path="/categories/new" component={NewCategory} />
      <Route path="/categories/:id/edit" component={EditCategory} />
      <Redirect path="/*" to="/" />
    </Switch>
  )

  return (
    <section className="section">
      <div className="container">
        <Router>
          <Navbar admin={admin} onLogout={() => props.authManager.logout()} />
          { admin ? AdminSwitch : ClientSwitch}
        </Router>
      </div>
    </section>
  )
}

export default App;
