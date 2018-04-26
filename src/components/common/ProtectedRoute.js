// If a user accesses a ProtectedRoute without a valid token they will be redirected to /login and a flash message will be displayed
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// Auth contains functions that let us establish if a user is logged in, and allows us to log them in, out, and examine their token
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';



//---------------------------------------//
const ProtectedRoute = ({ component: Component, ...rest }) => {
  !Auth.isAuthenticated() && Flash.setMessage('danger', 'You must be logged in');
  return (
    <Route {...rest} render={props =>
      Auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
    />
  );
};

export default ProtectedRoute;
