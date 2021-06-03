import React, { useState, useEffect } from 'react';
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

import LoggedUserContext from 'context/LoggedUserContext';

import 'components/App/App.module.scss';
import {backgroundContainer} from 'components/App/App.module.scss';

const authUrl = 'https://beer-recipes-app-backend.herokuapp.com/auth/local';

function App() {

  const [user, setUser] = useState({
    isUserLoggedIn: false,
    userName: '',
    token: ''
  })

  const updateUserState = () => {
    const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      if (token !== null && username !== null) {
        setUser({
          isUserLoggedIn: true,
          userName: username,
          token: token
        })
      } else {
        setUser({
          isUserLoggedIn: false,
          userName: '',
          token: ''
        })
      }
  }

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
    updateUserState();
    window.addEventListener('storage', () => {
      updateUserState();
    })
    }
    return () => isSubscribed = false;
  }, [])




  return (
    <div className="App">
      <LoggedUserContext.Provider value={{user, setUser}}>
        <Router>
          <Navigation />
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
      </LoggedUserContext.Provider>
      <div className={backgroundContainer}></div>
    </div>
  );
}

export default App;
