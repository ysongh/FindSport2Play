import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Paper, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ClearIcon from '@material-ui/icons/Clear';

import { deleteComment } from '../../../actions/eventActions';

class CommentItem extends Component{
    onDeleteClick(eventId, commentId){
      this.props.deleteComment(eventId, commentId);
    }
    
    render(){
        const {comment, auth} = this.props;
        const {event} = this.props.events;
        
        return(
            <Paper elevation={3}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar component={Link} to={`/profile/${comment.user}`}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={comment.text} secondary={<span>{comment.name} - <Moment fromNow>{comment.date}</Moment></span>} />
                {event.user._id === auth.user.id ? (
                  <IconButton
                    aria-label="delete"
                    onClick={this.onDeleteClick.bind(this, event._id, comment._id)}
                    color="secondary">
                    <ClearIcon fontSize="inherit" />
                  </IconButton>
                 ) : null}
              </ListItem>
            </Paper>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    events: state.events
});

export default withRouter(connect(mapStateToProps, {deleteComment})(CommentItem));