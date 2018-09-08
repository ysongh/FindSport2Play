import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import EventsList from './EventsList';
import Spinner from '../common/Spinner';
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
            eventContent = <Spinner />;
        }
        else{
            eventContent = (
                <div className="row">
                    <EventsList events={events} />
                </div>
            );
        }
        
        return(
            <div>
                <h1 className="text-center mt-2">List of Events</h1>
                <Link to="/" className="btn btn-light">
                    Go Back
                </Link>
                {isAuthenticated ? authLinks : null}
                {eventContent}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    events: state.events,
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, getEvents})(Events);