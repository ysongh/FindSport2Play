import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../common/Spinner';
import { getEvent } from '../../actions/eventActions';

class Event extends Component{
    componentDidMount(){
        this.props.getEvent(this.props.match.params.id);
    }
    
    render(){
        const {event, loading } = this.props.events;
        let eventContent;
        
        if(event === null || loading  || Object.keys(event).length === 0){
            eventContent = <Spinner />;
        }
        else{
            eventContent = (
                <div>
                    <p>{this.props.match.params.id}</p>
                    <p>{event.nameofevent}</p>
                    <p>{event.typeofsport}</p>
                    <p>{event.numberofplayer}</p>
                    <p>{event.location}</p>
                    <p>{event.description}</p>
                </div>
            );
        }
        
        return(
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/events" className="btn btn-light mb-3">
                                Back
                            </Link>
                            {eventContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    events: state.events
});

export default connect(mapStateToProps, {getEvent})(Event);