import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import styles from './Navbar.module.css';
import { removeNotification } from '../../actions/notificationActions';

class Notification extends Component{
    onDeleteClick(notificationId){
      this.props.removeNotification(notificationId);
    }
    
    render(){
        const {notification} = this.props;
        
        return(
            <div>
                <p className={styles.notification__date}><Moment format="MM/DD/YYYY">{notification.date}</Moment></p>
                <p onClick={this.onDeleteClick.bind(this, notification._id)}>{notification.text} by {notification.authorName}</p>
                <hr />
            </div>
           
        );
    }
}

export default connect(null, { removeNotification })(Notification);