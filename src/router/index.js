import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NoMatch from '../modules/no-match';
import Home from '../modules/home';
import Handsontable from '../modules/handsontable';
import Test from '../modules/test';

export default (
  <Switch>
    <Redirect from="/index" to="/" />
    <Route exact path="/" component={Home} />
    <Route exact path="/handsontable" component={Handsontable} />
    <Route exact path="/test" component={Test} />

    <Route component={NoMatch} />
  </Switch>
);
