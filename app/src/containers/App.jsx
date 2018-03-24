import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Home from '../home/Home';
import Login from '../login/Login';
import Signup from '../signup/Signup';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </div>
  </Router>
);

export default App;
