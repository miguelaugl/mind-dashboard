import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Login, Register, Dashboard, Profile } from '../pages';

const routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/profile/:id" component={Profile} />
    </Switch>
);
}

export default routes;
