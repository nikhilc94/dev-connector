
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import './App.css';
import store from './store';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import PrivateRoute from './components/common/PrivateRoute';


import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';


// Logic for maintaining sessions.
if (localStorage.jwtToken) {
  
  // Setting axios header.
  setAuthToken(localStorage.jwtToken);

  // Decoding token to get user info & expiration.
  const decoded = jwt_decode(localStorage.jwtToken);

  // Setting the auth state.
  store.dispatch(setCurrentUser(decoded));

  // Checking if token is expired.
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {

    // Logging out.
    store.dispatch(logoutUser());

    // Clear current profile.
    store.dispatch(clearCurrentProfile());
  
    // Redirecting to login page.
    window.location.href = '/login'

  }

}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <CreateProfile exact path="/create-profile" component={CreateProfile} />
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
