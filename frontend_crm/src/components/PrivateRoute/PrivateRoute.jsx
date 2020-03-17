import React from 'react';
// import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem('token');
  // console.log(isAuthenticated);
  // console.log(typeof (isAuthenticated));
  // console.log(isAuthenticated !== null);
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
