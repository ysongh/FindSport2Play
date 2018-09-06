import React, { Component } from 'react';
import EventsItem from './EventsItem';

class EventsList extends Component{
    render(){
        const {events} = this.props;
        
        return events.map(event => <EventsItem key={event._id} event={event} />);
    }
}

export default EventsList;