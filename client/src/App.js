import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utilis/setAuthToken';
import { setCurrentUser, logoutUser  } from './actions/authActions';
import { Provider } from 'react-redux';
import { Container } from '@material-ui/core';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/home/Home';
import Events from './components/events/Events';
import Event from './components/event/Event';
import CommentForm from './components/event/comments/CommentForm';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CreateEvent from './components/create-event/CreateEvent';
import Profile from './components/profile/Profile';
import CreateProfile from './components/create-profile/CreateProfile';
import UserProfile from './components/profile/UserProfile';

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
            <Navbar />
            <Route exact path="/" component={Home} />
            <Container>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/create-event" component={CreateEvent} />
                <Route exact path="/events" component={Events} />
                <Route exact path="/event/:id" component={Event} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <Route exact path="/profile/:id" component={UserProfile} />
                <PrivateRoute exact path="/event/:id/newcomment" component={CommentForm} />
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
            </Container>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
