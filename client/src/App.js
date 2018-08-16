import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Home from './components/home/Home';
import Events from './components/events/Events';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <div className="container">
            <Route exact path="/events" component={Events} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
