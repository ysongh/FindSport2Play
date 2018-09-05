import React, { Component } from 'react';
import EventItem from './EventItem';

class EventsList extends Component{
    render(){
        const {events} = this.props;
        
        return events.map(post => <EventItem key={event._id} event={event} />);
    }
}

export default EventsList;