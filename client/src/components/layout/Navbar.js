import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, AppBar, Toolbar, Drawer, List, ListItem, ListItemText, Badge, Button, Link, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { logoutUser } from '../../actions/authActions';
import { checkNotification } from '../../actions/notificationActions';
import NotificationList from './NotificationList';

import Logo from '../../img/logo.png';

class Navbar extends Component {
  constructor(props){
      super(props);
      this.state = {
          showNotification: false,
          toggleDrawer: false,
          anchorEl: ""
      };
  }
  
  onShowNotification(e){
      e.preventDefault();
      this.setState({
          showNotification: true,
          anchorEl: e.currentTarget
      });
      this.props.checkNotification();
  }

  onHideNotification(e){
      e.preventDefault();
      this.setState({
          showNotification: false,
          anchorEl: null
      });
  }
  
  onLogoutClick(e){
      e.preventDefault();
      this.props.logoutUser();
  }
  
  render() {
    const {isAuthenticated, user, notifications} = this.props.auth;

    const handleDrawerOpen = () => {
      this.setState({ toggleDrawer: true});
    };
  
    const handleDrawerClose = () => {
      this.setState({ toggleDrawer: false});
    };

    const notificationsList = (
      <Badge badgeContent={notifications.unread} color="secondary" onClick={this.onShowNotification.bind(this)} className="xm-1">
        <NotificationsIcon />
      </Badge>
    );

    // Start of Desktop Navbar
    const authLinks = (
      <div className="hiddenDesk">
        {notificationsList}
        <Link className="white-link" component={RouterLink} to="/profile">
          Welcome, {user.name}
        </Link>
        <Button className="secondary-color" onClick={this.onLogoutClick.bind(this)} variant="contained">
          Logout
        </Button>
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
    // End of Desktop Navbar

    // Start of Mobile Navbar
    const sideAuthLinks = (
      <div>
        <ListItem button component={RouterLink} to="/profile">
          <ListItemText primary="Your Profile" />
        </ListItem>
        <ListItem button onClick={this.onLogoutClick.bind(this)}>
          <ListItemText primary="Logout" />
        </ListItem>
      </div>
    );

    const sideGuestLinks = (
      <div>
        <ListItem button component={RouterLink} to="/login" color="textPrimary">
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button component={RouterLink} to="/register" color="textPrimary">
          <ListItemText primary="Get Started" />
        </ListItem>
      </div>
    );
    // End of Mobile Navbar

    const sideDrawer = (
      <List component="nav">
        <ListItem button component={RouterLink} to="/">
          <img src={Logo} className="logo" alt="Logo" />
        </ListItem>
        <ListItem button component={RouterLink} to="/events">
          <ListItemText primary="Events List" />
        </ListItem>
        <ListItem button component={RouterLink} to="/create-event">
          <ListItemText primary="Create Event" />
        </ListItem>
        {isAuthenticated ? sideAuthLinks : sideGuestLinks}
      </List>
    );
    
    return (
      <AppBar className="primary-color" position="static">
        <Container>
          <Toolbar disableGutters className="toolbar">
            <Link component={RouterLink} to="/">
              <img src={Logo} className="logo" alt="Logo" />
            </Link>

            <div className="hiddenDesk">
              <Link className="white-link" component={RouterLink} to="/events">
                Events List
              </Link>
              <Link className="white-link" component={RouterLink} to="/create-event">
                Create Event
              </Link>
            </div>
            
            <div className="toolbarRight">
              {isAuthenticated ? authLinks : guestLinks}
              <div className="hiddenMobile">
                {isAuthenticated ? notificationsList : null}
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                  <MenuIcon />
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </Container>
        
        <Drawer anchor="right" open={this.state.toggleDrawer} onClick={handleDrawerClose} onClose={handleDrawerClose} onKeyDown={handleDrawerClose}>
          {sideDrawer}
        </Drawer>
        <NotificationList notifications={notifications.notification} anchorEl={this.state.anchorEl} onClose={this.onHideNotification.bind(this)} />
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, checkNotification})(Navbar);