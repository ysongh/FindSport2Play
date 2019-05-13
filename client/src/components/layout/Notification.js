import React, { Component } from 'react';
import Moment from 'react-moment';

import styles from './Navbar.module.css';

class Notification extends Component{
    render(){
        const {notification} = this.props;
        
        return(
            <div>
                <p className={styles.notification__date}><Moment format="MM/DD/YYYY">{notification.date}</Moment></p>
                <p>{notification.text} by {notification.authorName}</p>
                <hr />
            </div>
           
        );
    }
}

export default Notification;