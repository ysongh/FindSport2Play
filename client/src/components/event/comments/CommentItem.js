import React, { Component } from 'react';
import { connect } from 'react-redux';

class CommentItem extends Component{
    onDeleteClick(eventId, commentId){
        console.log(eventId + " " + commentId);
    }
    
    render(){
        const {comment, auth} = this.props;
        const {event} = this.props.events;
        
        return(
            <div className="card card bg-light text-dark mb-1 p-2">
              <div className="row">
                <div className="col-md-1">
                  <i className="far fa-user text-center"></i>
                  <p>{comment.name}</p>
                  {event.user._id === auth.user.id ? (
                    <button 
                      onClick={this.onDeleteClick.bind(this, event._id, comment._id)}
                      type="button"
                      className="btn btn-danger mr-1" >
                      <i className="fas fa-times" />
                    </button>
                   ) : null}
                </div>
                <div className="col-md-11">
                  <p className="lead">
                    {comment.text}
                  </p>
                </div>
              </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    events: state.events
});

export default connect(mapStateToProps)(CommentItem);