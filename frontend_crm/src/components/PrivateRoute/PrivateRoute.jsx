import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) => ((isAuthenticated !== null) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      ))}
    />
  );
}

export default PrivateRoute;
