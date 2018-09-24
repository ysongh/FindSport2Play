import React, { Component } from 'react';

import CommentItem from './CommentItem';

class Comments extends Component {
    render(){
        const {comments, eventId} = this.props;
        
        return comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} eventId={eventId} />
        ));
    }
}

export default Comments;