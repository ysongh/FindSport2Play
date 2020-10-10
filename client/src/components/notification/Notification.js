import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Moment from 'react-moment';

import styles from './Notification.module.css';
import { removeNotification } from '../../actions/notificationActions';

class Notification extends Component{
    onDeleteClick(notificationId){
      this.props.removeNotification(notificationId);
    }
    
    render(){
        const {notification} = this.props;
        
        return(
            <div className={styles.notification__container + " " + (!notification.read ? ( styles.notification__notRead) : null)}>
                <p className={styles.notification__date}>
                    <Moment fromNow>{notification.date}</Moment>
                    <IconButton size="small" onClick={this.onDeleteClick.bind(this, notification._id)}>
                        <HighlightOffIcon />
                    </IconButton>
                </p>
                <p className={styles.notification__text }>
                    <Link to={`/profile/${notification.authorID}`}>{notification.authorName}</Link> {notification.text}
                </p>
                <hr />
            </div>
           
        );
    }
}

export default connect(null, { removeNotification })(Notification);