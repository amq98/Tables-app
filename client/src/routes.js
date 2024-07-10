import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import Login from './components/Login';
import Register from './components/Register';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={RestaurantList} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      {/* Add more routes here */}
    </Switch>
  </Router>
);

export default Routes;
