import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import LostItems from './components/LostItems';
import FoundItems from './components/FoundItems';
import ReportLostItem from './components/ReportLostItem';
import ReportFoundItem from './components/ReportFoundItem';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/lost-items" component={LostItems} />
        <Route exact path="/found-items" component={FoundItems} />
        <Route exact path="/report-lost" component={ReportLostItem} />
        <Route exact path="/report-found" component={ReportFoundItem} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
};

export default App;
