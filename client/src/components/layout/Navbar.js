import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Drawer, Button, Link } from '@material-ui/core';

import { logoutUser } from '../../actions/authActions';
import { checkNotification } from '../../actions/notificationActions';
import NotificationList from './NotificationList';
import styles from './Navbar.module.css';

import Logo from '../../img/logo.png';

class Navbar extends Component {
  constructor(props){
      super(props);
      this.state = {
          showNotification: false,
          toggleDrawer: false
      };
  }
  
  onShowNotification(e){
      e.preventDefault();
      this.setState(prevState => ({
          showNotification: !prevState.showNotification
      }));
      this.props.checkNotification();
  }
  
  onLogoutClick(e){
      e.preventDefault();
      this.props.logoutUser();
  }
  
  render() {
    const {isAuthenticated, user, notifications} = this.props.auth;

    const notificationList = (
      <div className={styles.notification}>
        <NotificationList notifications={notifications.notification} />
      </div>
    );
    
    const authLinks = (
      <div>
        <button onClick={this.onShowNotification.bind(this)}>
          <i className="far fa-bell notification__icon">
            <sup className={styles.notification__number}>{notifications.unread}</sup>
          </i>
        </button>
        { this.state.showNotification ? notificationList : null }
        <Link component={RouterLink} to="/profile" color="textPrimary">
          Welcome, {user.name}
        </Link>
        <Button onClick={this.onLogoutClick.bind(this)} variant="contained" color="secondary">
          Logout
        </Button>
      </div>
    );

    const handleDrawerOpen = () => {
      this.setState({ toggleDrawer: true});
    };
  
    const handleDrawerClose = () => {
      this.setState({ toggleDrawer: false});
    };
    
    const guestLinks = (
      <div>
        <Link component={RouterLink} to="/login" color="textPrimary">
          Login
        </Link>
        <Button component={RouterLink} to="/register" variant="contained" color="secondary">
          Get Started
        </Button>
      </div>
    );
    
    return (
      <AppBar position="relative">
        <Toolbar>
          <Link component={RouterLink} to="/">
            <img src={Logo} className="logo" alt="Logo" />
          </Link>
          <Link component={RouterLink} to="/events" color="textPrimary">
            {' '}
            List of Events
          </Link>
          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
        <Button onClick={handleDrawerOpen}>Open</Button>
        <Drawer anchor="right" open={this.state.toggleDrawer} onClick={handleDrawerClose} onClose={handleDrawerClose} onKeyDown={handleDrawerClose}>
          <Toolbar>
            <Link component={RouterLink} to="/">
              <img src={Logo} className="logo" alt="Logo" />
            </Link>
            <Link component={RouterLink} to="/events" color="textPrimary">
              {' '}
              List of Events
            </Link>
            {isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
        </Drawer>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, checkNotification})(Navbar);