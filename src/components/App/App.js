import React, { useState } from 'react';
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

  const [user, setUser] = useState({
    isUserLoggedIn: false,
    userName: 'adam'
  })

  return (
    <div className="App">
        <Router>
          <Navigation user={user} />
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
