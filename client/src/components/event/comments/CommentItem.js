import React, { Component } from 'react';
import { connect } from 'react-redux';

class CommentItem extends Component{
    
    render(){
        const {comment} = this.props;
        
        return(
            <div className="card card bg-light text-dark mb-1 p-2">
              <div className="row">
                <div className="col-md-1">
                  <i className="far fa-user text-center"></i>
                  <p>{comment.name}</p>
                  <br />
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
    auth: state.auth
});

export default connect(mapStateToProps)(CommentItem);