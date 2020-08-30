import React, { useContext } from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';

import { Login, Register, Dashboard, Profile } from '../pages';
import { Context } from '../context/AuthContext';
import { Loading } from '../components';

interface CustomRoute extends RouteProps {
  isPrivate?: boolean;
}

function CustomRoute({ isPrivate, ...rest }: CustomRoute) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <Loading />;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
}

const routes: React.FC = () => {
  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute exact path="/register" component={Register} />
      <CustomRoute isPrivate exact path="/dashboard" component={Dashboard} />
      <CustomRoute isPrivate exact path="/profile/:id" component={Profile} />
    </Switch>
);
}

export default routes;
