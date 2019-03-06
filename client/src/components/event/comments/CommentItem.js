import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { deleteComment } from '../../../actions/eventActions';

class CommentItem extends Component{
    onDeleteClick(eventId, commentId){
      this.props.deleteComment(eventId, commentId);
    }
    
    render(){
        const {comment, auth} = this.props;
        const {event} = this.props.events;
        
        return(
            <div className="card card bg-light text-dark mb-1 p-2">
              <p className="lead">
                {comment.text}
              </p>
              <div class="d-flex flex-row align-items-center">
                <i className="far fa-user mr-2"></i>
                 <Link to={`/profile/${comment.user}`}>
                     <p className="font-italic d-inline">{comment.name}</p>
                </Link>
                {event.user._id === auth.user.id ? (
                  <button 
                    onClick={this.onDeleteClick.bind(this, event._id, comment._id)}
                    type="button"
                    className="btn btn-danger ml-auto p-2" >
                    <i className="fas fa-times" />
                  </button>
                 ) : null}
               </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    events: state.events
});

export default withRouter(connect(mapStateToProps, {deleteComment})(CommentItem));