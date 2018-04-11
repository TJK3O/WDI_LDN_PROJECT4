import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './components/common/ProtectedRoute';
import FlashMessages from './components/common/FlashMessages';
import HomeRoute from './components/pages/HomeRoute';
import IndexRoute from './components/content/IndexRoute';
import MusicShowRoute from './components/content/MusicShowRoute';
import FilmsShowRoute from './components/content/FilmsShowRoute';
import TvShowRoute from './components/content/TvShowRoute';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AuthShowRoute from './components/auth/ShowRoute';
import AuthEditRoute from './components/auth/EditRoute';
import Navbar from './components/common/Navbar';

import 'bulma';
import './assets/styles/styles.scss';

class App extends React.Component {

  render() {
    return (
      // Any routes need to sit in the BrowserRouter tags
      <BrowserRouter>
        {/* Switch shows a single route at once. */}
        <main>
          <Navbar />
          <FlashMessages />
          <section className="container">
            <Switch>
              <ProtectedRoute path="/user/:id/edit" component={AuthEditRoute} />
              <ProtectedRoute path="/user/:id" component={AuthShowRoute} />
              <ProtectedRoute path="/content/music/:id" component={MusicShowRoute} />
              <ProtectedRoute path="/content/films/:id" component={FilmsShowRoute} />
              <ProtectedRoute path="/content/tv/:id" component={TvShowRoute} />
              <ProtectedRoute path="/content" component={IndexRoute} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/" component={HomeRoute} />
            </Switch>
          </section>
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
