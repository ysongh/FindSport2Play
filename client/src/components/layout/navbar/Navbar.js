import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, AppBar, Toolbar, Drawer, List, ListItem, ListItemText, Badge, Link, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { logoutUser } from '../../../actions/authActions';
import { checkNotification } from '../../../actions/notificationActions';
import Desktop from './Desktop';
import Mobile from './Mobile';
import NotificationList from '../../notification/NotificationList';
import UserMenu from '../UserMenu';

import Logo from '../../../img/logo.png';

class Navbar extends Component {
  constructor(props){
      super(props);
      this.state = {
          showNotification: false,
          showUserMenu: false,
          toggleDrawer: false,
          anchorEl1: "",
          anchorEl2: ""
      };
  }
  
  onShowNotification(e){
      e.preventDefault();
      this.setState({
          showNotification: true,
          anchorEl1: e.currentTarget
      });
      this.props.checkNotification();
  }

  onShowUserMenu(e){
    e.preventDefault();
    this.setState({
        showUserMenu: true,
        anchorEl2: e.currentTarget
    });
  }

  onHideNotification(e){
      e.preventDefault();
      this.setState({
          showNotification: false,
          anchorEl1: null
      });
  }

  onHideUserMenu(e){
    e.preventDefault();
    this.setState({
        showUserMenu: false,
        anchorEl2: null
    });
}
  
  onLogoutClick(e){
      e.preventDefault();
      this.props.logoutUser();
  }
  
  render() {
    const {isAuthenticated, notifications} = this.props.auth;

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
        <Mobile
          isAuthenticated={isAuthenticated}
          logout={this.onLogoutClick.bind(this)} />
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
              <Desktop
                isAuthenticated={isAuthenticated}
                notificationsUnread={notifications.unread}
                onShowNotification={this.onShowNotification.bind(this)}
                onShowUserMenu={this.onShowUserMenu.bind(this)} />
                
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

        <NotificationList notifications={notifications.notification} anchorEl={this.state.anchorEl1} onClose={this.onHideNotification.bind(this)} />
        <UserMenu anchorEl={this.state.anchorEl2} onClose={this.onHideUserMenu.bind(this)} onLogOut={this.onLogoutClick.bind(this)}/>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, checkNotification})(Navbar);