import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const auth = useSelector((store) => {
    return store.auth;
  });

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (auth?.isLoading) {
          return <></>;
        }
        if (auth?.role === rest?.role) {
          return <RouteComponent {...routeProps} />;
        }
        return <Redirect to={'/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
