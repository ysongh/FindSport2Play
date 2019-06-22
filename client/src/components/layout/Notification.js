import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            <div className={styles.notification__container}>
                <p className={styles.notification__date}>
                    <Moment format="MM/DD/YYYY">{notification.date}</Moment>
                    <button className={styles.notification__removeButton} onClick={this.onDeleteClick.bind(this, notification._id)}><i className="fas fa-times" /></button>
                </p>
                <p className={styles.notification__text}>
                    <Link to={`/profile/${notification.userID}`}>{notification.authorName}</Link> {notification.text}
                </p>
                <hr />
            </div>
           
        );
    }
}

export default connect(null, { removeNotification })(Notification);