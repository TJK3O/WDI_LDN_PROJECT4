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
import NotFound from './components/common/NotFound';

import 'bulma';
import './assets/styles/styles.scss';

class App extends React.Component {

  render() {
    return (
      // Any routes need to sit in the BrowserRouter tags
      <BrowserRouter>
        <main className="container">
          <Navbar />
          <FlashMessages />
          <section>
            {/* Switch shows a single route at once, so Navbar and FlashMessages must sit outside */}
            <Switch>
              <ProtectedRoute path="/user/:id/edit" component={AuthEditRoute} />
              <ProtectedRoute path="/user/:id" component={AuthShowRoute} />
              <ProtectedRoute path="/content/music/:id" component={MusicShowRoute} />
              <ProtectedRoute path="/content/films/:id" component={FilmsShowRoute} />
              <ProtectedRoute path="/content/tv/:id" component={TvShowRoute} />
              <ProtectedRoute path="/content" component={IndexRoute} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route exact path="/" component={HomeRoute} />
              <Route component={NotFound} />
            </Switch>
          </section>
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  // This renders the app.js component in the index.html div with an id of 'root'
  document.getElementById('root')
);
