import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeRoute from './components/pages/HomeRoute';
import IndexRoute from './components/content/IndexRoute';
import ShowRoute from './components/content/ShowRoute';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AuthShowRoute from './components/auth/ShowRoute';

import 'bulma';

class App extends React.Component {

  render() {
    return (
      // Any routes need to sit in the BrowserRouter tags
      <BrowserRouter>
        {/* Switch shows a single route at once. */}
        <main className="container">
          <Switch>
            <Route path="/user/:id" component={AuthShowRoute} />
            <Route path="/content/:id" component={ShowRoute} />
            <Route path="/content" component={IndexRoute} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" component={HomeRoute} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
