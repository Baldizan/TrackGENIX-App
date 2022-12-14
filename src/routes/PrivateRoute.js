import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { isPending, authenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (isPending) {
          return <></>;
        }
        if (authenticated?.role === rest?.role) {
          return <RouteComponent {...routeProps} />;
        }
        return <Redirect to={'/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
