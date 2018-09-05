import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import EventsList from './EventsList';
import { getEvents } from '../../actions/eventActions';
import { logoutUser } from '../../actions/authActions';

class Events extends Component{
    componentDidMount(){
         this.props.getEvents();
     }
    
    onLogoutClick(e){
        e.preventDefault();
        this.props.logoutUser();
    }
    
    render(){
        const {isAuthenticated} = this.props.auth;
    
        const authLinks = (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">
                  Logout
              </a>
            </li>
          </ul>
        );
        
        const {events, loading} = this.props.events;
        let eventContent;
        
        if(events === null || loading){
            eventContent = <p>loading</p>;
        }
        else{
            eventContent = <EventsList events={events} />;
        }
        
        return(
            <div>
                <h1>List of Events</h1>
                <Link to="/" className="btn btn-light">
                    Go Back
                </Link>
                {isAuthenticated ? authLinks : null}
                <div className="row">
                    {eventContent}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    events: state.events,
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, getEvents})(Events);