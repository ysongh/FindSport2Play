import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';

import Logo from '../../../img/logo.png';

const SideDrawer = ({ isAuthenticated, logout }) => {
    const authLinks = (
      <div>
        <ListItem button component={RouterLink} to="/create-event">
          <ListItemText primary="Create Event" />
        </ListItem>
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
    
    return(
      <List component="nav">
        <ListItem button component={RouterLink} to="/">
          <img src={Logo} className="logo" alt="Logo" />
        </ListItem>
        <ListItem button component={RouterLink} to="/events">
          <ListItemText primary="Events List" />
        </ListItem>
        {isAuthenticated ? authLinks : guestLinks}
      </List>
    )
}

export default SideDrawer;