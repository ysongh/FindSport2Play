import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Badge, Button, Link } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Desktop = ({ isAuthenticated, notificationsUnread, onShowNotification, onShowUserMenu }) => {
    const notificationsList = (
        <Badge badgeContent={notificationsUnread} color="secondary" onClick={onShowNotification} className="xm-1">
          <NotificationsIcon className="icon-s" />
        </Badge>
    );

    const authLinks = (
        <div className="hiddenDesk">
            {notificationsList}
            <Badge color="secondary" onClick={onShowUserMenu}>
                <PersonIcon className="icon-m" />
                <ExpandMoreIcon className="down-arrow" />
            </Badge>
        </div>
    );
    
    const guestLinks = (
        <div className="hiddenDesk">
            <Link className="white-link" component={RouterLink} to="/login">
                Login
            </Link>
            <Button className="secondary-color white-link" component={RouterLink} to="/register" variant="contained">
                Get Started
            </Button>
        </div>
    );
    
    return isAuthenticated ? authLinks : guestLinks;
}

export default Desktop;