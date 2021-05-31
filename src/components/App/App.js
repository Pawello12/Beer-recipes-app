import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navigation from 'components/Navigation/Navigation';
import Header from 'components/Header/Header';
import Home from 'routes/Home/Home';
import Search from 'routes/Search/Search';
import Favourites from 'routes/Favourites/Favourites';
import LogIn from 'routes/LogIn/LogIn';
import Register from 'routes/Register/Register';

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

            <Route path='/login'>
              <LogIn />
            </Route>

            <Route path='/register'>
              <Register />
            </Route>

            <Route path='/search'>
              <Search />
            </Route>

            <Route path='/favourites'>
              <Favourites />
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
