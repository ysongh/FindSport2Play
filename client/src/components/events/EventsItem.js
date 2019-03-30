import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import sportImage from '../../img/sport.png';

class EventsItem extends Component{
    render(){
        const {event} = this.props;
        
        return(
            <div className="col-md-3 col-sm-6">
                <div className="card p-1">
                    <Link to={`/event/${event._id}`}>
                        <img className="card-img-top" style={{height: '220px'}} src={event.imageURL ? event.imageURL : sportImage}
                          alt="Sport" />
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title">{event.nameofevent}</h5>
                        <p className="card-text">{event.typeofsport}</p>
                        <p className="card-text">
                            <i className="fas fa-users"></i> {event.numberofplayer}
                        </p>
                        <Link to={`/event/${event._id}`} className="btn btn-info d-flex justify-content-center">More Info</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null)(EventsItem);