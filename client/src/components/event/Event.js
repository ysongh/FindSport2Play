import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paper, List } from '@material-ui/core';

import Spinner from '../common/Spinner';
import EventItem from '../event/EventItem';
import Comments from './comments/Comments';
import CommentForm from './comments/CommentForm';
import { getEvent } from '../../actions/eventActions';

class Event extends Component{
    componentDidMount(){
        this.props.getEvent(this.props.match.params.id);
    }
    
    render(){
        const { event, snackbarMessage, loading } = this.props.events;
        const { isAuthenticated } = this.props.auth;
        let eventContent;
        
        if(event === null || loading  || Object.keys(event).length === 0){
            eventContent = <Spinner />;
        }
        else{
            eventContent = (
                <div>
                    <Paper elevation={3}>
                        <EventItem event={event} snackbarMessage={snackbarMessage} auth={isAuthenticated}/>
                    </Paper>
                    {isAuthenticated ? <CommentForm /> : <h2>You need to login to add comment. <Link to="/login">Click Here</Link></h2>}
                    {event.comments.length > 0 ? <Comments eventId={event._id} comments={event.comments} /> : <h2 className="mb-5">No Comment Yet</h2>}
                </div>
            );
        }
        
        return(
            <div className="post">
                <div className="container">
                    <h1 className="primary-textColor">{event.nameofevent}</h1>
                    <List>
                    {eventContent}
                    </List>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    events: state.events
});

export default connect(mapStateToProps, {getEvent})(Event);