import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ListItem, ListItemText } from '@material-ui/core';

const Mobile = ({ isAuthenticated, logout }) => {
    const authLinks = (
        <div>
          <ListItem button component={RouterLink} to="/profile">
            <ListItemText primary="Your Profile" />
          </ListItem>
          <ListItem button onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </div>
    );
  
    const guestLinks = (
        <div>
          <ListItem button component={RouterLink} to="/login" color="textPrimary">
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={RouterLink} to="/register" color="textPrimary">
            <ListItemText primary="Get Started" />
          </ListItem>
        </div>
    );
    
    return isAuthenticated ? authLinks : guestLinks;
}

export default Mobile;