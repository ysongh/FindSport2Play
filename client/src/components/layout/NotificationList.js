import React, { Component } from 'react';
import { Menu } from '@material-ui/core';

import Notification from './Notification';

class NotificationList extends Component{
    render(){
        const {notifications, anchorEl, onClose} = this.props;
        
        return (
            <Menu id="simple-menu"  anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
                { notifications.map(notification =>
                    <Notification key={notification._id} notification={notification} />
                )}
            </Menu>
        );
    }
}

export default NotificationList;