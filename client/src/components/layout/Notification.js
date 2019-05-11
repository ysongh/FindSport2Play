import React, { Component } from 'react';

class Notification extends Component{
    render(){
        const {notification} = this.props;
        
        return(
            <p>{notification.text} by {notification.authorName}</p>
        );
    }
}

export default Notification;