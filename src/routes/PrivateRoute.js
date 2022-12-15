import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { isPending } = useSelector((state) => state.auth);
  const role = sessionStorage.getItem('role');

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (isPending) {
          return <></>;
        }
        if (!isPending && role === rest.role) {
          return <RouteComponent {...routeProps} />;
        }
        return <Redirect to={'/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
