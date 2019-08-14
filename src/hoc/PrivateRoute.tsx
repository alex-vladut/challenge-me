import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }: any) => (
  <Route
    {...props}
    render={innerProps =>
      props.isAuthenticated
        ? <Component {...innerProps} />
        : <Redirect to="/auth" />
    }
  />
);

export default PrivateRoute;