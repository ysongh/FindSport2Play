import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//import Map from './map/Map.js';
import sportImage from '../../img/sport.png';
import { deleteEvent, joinEvent } from '../../actions/eventActions';

class EventItem extends Component{
    onDeleteClick(id){
        this.props.deleteEvent(id);
        this.props.history.push('/events');
    }
    
    onJoinClick(id){
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login');
        }
        this.props.joinEvent(id);
    }
    
    render(){
        const {event, auth} = this.props;
        
        return(
            <div className="jumbotron">
                <div className="row">
                    <div className="col-md-4">
                        <span className="badge badge-info">Type of Sport</span>
                        <p>{event.typeofsport}</p>
                        
                        <span className="badge badge-info">Number of Player</span>
                        <p><i className="fas fa-users"></i>{event.numberofplayer}</p>
                        
                        <span className="badge badge-info">Location</span>
                        <p>
                            {event.location ? event.location : "To Be Announced"}
                        </p>
                        
                        <span className="badge badge-info">Start Date</span>
                        <p>
                            {event.start ? <Moment format="MM/DD/YYYY">{event.start}</Moment> : "To Be Announced"}
                        </p>
                        
                        <span className="badge badge-info">Description</span>
                        <p>
                            {event.description ? event.description : "None"}
                        </p>
                        
                        <div>
                             <p className="d-inline">Host By</p>
                             <Link to={`/profile/${event.user._id}`}>
                                 <p className="font-italic d-inline"> {event.user.name} </p>
                            </Link>
                            on <Moment format="MM/DD/YYYY">{event.date}</Moment>
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
                    <div className="col-md-8">
                        <span className="badge badge-info">Image</span>
                        <img className="card-img-top" style={{height: '350px'}} src={event.imageURL ? event.imageURL : sportImage}
                          alt="Sport" />
                    </div>
                </div>
                <hr />
                <div className="d-flex">
                    <button 
                        onClick={this.onJoinClick.bind(this, event._id)}
                        type="button"
                        className="btn btn-success mr-1" >
                        {auth.isAuthenticated ? "Join This Event" : "Login to Join"}
                    </button>
                    <p className="mt-3">{event.numberofplayer - event.listofplayer.length} spots left</p>
                </div>
                <div className="mt-3">
                    <ol>
                        { event.listofplayer.map( player => {
                            return <li key={player._id}>{ player.name }</li>;
                        }) }
                    </ol>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteEvent, joinEvent })(withRouter(EventItem));