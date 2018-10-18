import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { deleteEvent } from '../../actions/eventActions';

class EventItem extends Component{
    onDeleteClick(id){
        this.props.deleteEvent(id);
        this.props.history.push('/events');
    }
    
    render(){
        const {event, auth} = this.props;
        
        return(
            <div className="jumbotron">
                <span className="badge badge-info">Date</span>
                <p><Moment format="MM/DD/YYYY">{event.date}</Moment></p>
                
                <span className="badge badge-info">Type of Sport</span>
                <p>{event.typeofsport}</p>
                
                <span className="badge badge-info">Number of Player</span>
                <p><i className="fas fa-users"></i>{event.numberofplayer}</p>
                
                <span className="badge badge-info">Location</span>
                <p>
                    {event.location ? event.location : "To Be Announced"}
                </p>
                
                <span className="badge badge-info">Description</span>
                <p>
                    {event.description ? event.description : "None"}
                </p>
                
                <div>
                     <p className="d-inline">Host By</p>
                     <Link to={`/profile/${event.user._id}`}>
                         <p className="font-italic d-inline"> {event.user.name}</p>
                    </Link>
                </div>
                
                {event.user._id === auth.user.id ? (
                    <button 
                        onClick={this.onDeleteClick.bind(this, event._id)}
                        type="button"
                        className="btn btn-danger mr-1" >
                        Delete
                    </button>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteEvent})(withRouter(EventItem));