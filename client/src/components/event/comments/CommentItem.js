import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

import { deleteComment } from '../../../actions/eventActions';

class CommentItem extends Component{
    onDeleteClick(eventId, commentId){
      this.props.deleteComment(eventId, commentId);
    }
    
    render(){
        const {comment, auth} = this.props;
        const {event} = this.props.events;
        
        return(
            <div>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={comment.text} secondary={comment.date.slice(11, 19)} />
                {event.user._id === auth.user.id ? (
                  <button 
                    onClick={this.onDeleteClick.bind(this, event._id, comment._id)}
                    type="button"
                    className="btn btn-danger ml-auto p-2" >
                    <i className="fas fa-times" />
                  </button>
                 ) : null}
              </ListItem>
              <Divider variant="inset" />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    events: state.events
});

export default withRouter(connect(mapStateToProps, {deleteComment})(CommentItem));