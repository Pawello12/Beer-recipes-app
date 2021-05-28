import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Navigation from 'components/Navigation/Navigation';
import Header from 'components/Header/Header';
import Home from 'routes/Home/Home';

import 'components/App/App.module.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Header />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
