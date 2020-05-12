import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import EventsList from './EventsList';
import Spinner from '../common/Spinner';
import { getEvents } from '../../actions/eventActions';

class Events extends Component{
    componentDidMount(){
        window.scrollTo(0, 0);
        this.props.getEvents();
    }
    
    render(){
        const {events, loading} = this.props.events;
        let eventContent;
        
        if(events === null || loading){
            eventContent = <Spinner />;
        }
        else{
            eventContent = (
                <Grid container spacing={4}>
                    <EventsList events={events} />
                </Grid>
            );
        }
        
        return(
            <div>
                <h1 className="text-center mt-2">List of Events</h1>
                <Link to="/create-event" className="btn btn-light mt-2">
                    Add Event
                </Link>
                {eventContent}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    events: state.events
});

export default connect(mapStateToProps, { getEvents})(Events);