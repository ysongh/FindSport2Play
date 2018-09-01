import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utilis/setAuthToken';
import { setCurrentUser, logoutUser  } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import Home from './components/home/Home';
import Events from './components/events/Events';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  
  const currentTime = Date.now() / 1000;
  
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Home} />
            <div className="container">
              <Route exact path="/events" component={Events} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
