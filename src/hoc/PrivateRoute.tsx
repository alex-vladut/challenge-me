import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }: any) => (
  <Route
    {...props}
    render={innerProps =>
      props.isAuthenticated
        ? <Component {...innerProps} />
        : <Redirect
          to={{
            pathname: "/auth",
            state: { from: props.location && props.location.pathname }
          }} />
    }
  />
);

export default PrivateRoute;