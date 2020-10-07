import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { List, ListItemIcon, ListItem, ListItemText } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EventIcon from '@material-ui/icons/Event';
import CreateIcon from '@material-ui/icons/Create';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Logo from '../../../img/logo.png';

const SideDrawer = ({ isAuthenticated, logout }) => {
    const authLinks = (
      <div>
        <ListItem button component={RouterLink} to="/create-event">
          <ListItemIcon className="siderdrawer-icon">
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Create Event" />
        </ListItem>
        <ListItem button component={RouterLink} to="/profile">
          <ListItemIcon className="siderdrawer-icon">
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Your Profile" />
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemIcon className="siderdrawer-icon">
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </div>
    );
  
    const guestLinks = (
      <div>
        <ListItem button component={RouterLink} to="/login" color="textPrimary">
          <ListItemIcon className="siderdrawer-icon">
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button component={RouterLink} to="/register" color="textPrimary">
          <ListItemIcon className="siderdrawer-icon">
            <CreateIcon />
          </ListItemIcon>
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
          <ListItemIcon className="siderdrawer-icon">
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Events List" />
        </ListItem>
        {isAuthenticated ? authLinks : guestLinks}
      </List>
    )
}

export default SideDrawer;