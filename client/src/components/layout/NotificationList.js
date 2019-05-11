import React, { Component } from 'react';
import Notification from './Notification';

class NotificationList extends Component{
    render(){
        const {notifications} = this.props;
        
        return notifications.map(notification =>
            <Notification key={notification._id} notification={notification} />
        );
    }
}

export default NotificationList;