
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) => ((isAuthenticated !== 0) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      ))}
    />
  );
}

export default PrivateRoute;
