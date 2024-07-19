import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import LoginSuccess from './LoginSuccess';
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/login/success" component={LoginSuccess} />
        <Route path="/admin" component={AdminDashboard} />
      </Switch>
    </Router>
  );
}

export default App;
