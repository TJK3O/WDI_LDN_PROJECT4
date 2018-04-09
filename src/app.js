import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeRoute from './components/pages/HomeRoute';
import IndexRoute from './components/content/IndexRoute';
import MusicShowRoute from './components/content/MusicShowRoute';
import FilmsShowRoute from './components/content/FilmsShowRoute';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AuthShowRoute from './components/auth/ShowRoute';
import Navbar from './components/common/Navbar';

import 'bulma';

class App extends React.Component {

  render() {
    return (
      // Any routes need to sit in the BrowserRouter tags
      <BrowserRouter>
        {/* Switch shows a single route at once. */}
        <main>
          <Navbar />
          <section className="container">
            <Switch>
              <Route path="/user/:id" component={AuthShowRoute} />
              <Route path="/content/music/:id" component={MusicShowRoute} />
              <Route path="/content/films/:id" component={FilmsShowRoute} />
              <Route path="/content" component={IndexRoute} />
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
