import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, AppBar, Toolbar, Drawer, Badge, Link, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { logoutUser } from '../../../actions/authActions';
import { checkNotification } from '../../../actions/notificationActions';
import Desktop from './Desktop';
import SideDrawer from './SideDrawer';
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
      this.onShowNotification = this.onShowNotification.bind(this);
      this.onShowUserMenu = this.onShowUserMenu.bind(this);
      this.onHideNotification = this.onHideNotification.bind(this);
      this.onHideUserMenu = this.onHideUserMenu.bind(this);
      this.onLogoutClick = this.onLogoutClick.bind(this);
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
      <Badge badgeContent={notifications.unread} color="secondary" onClick={this.onShowNotification} className="xm-1">
        <NotificationsIcon />
      </Badge>
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
              
              { isAuthenticated ? (
                <Link className="white-link" component={RouterLink} to="/create-event">
                  Create Event
                </Link>
              ) : null }
            </div>
            
            <div className="toolbarRight">
              <Desktop
                isAuthenticated={isAuthenticated}
                notificationsUnread={notifications.unread}
                onShowNotification={this.onShowNotification}
                onShowUserMenu={this.onShowUserMenu} />
                
              <div className="hiddenMobile">
                { isAuthenticated ? notificationsList : null }
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                  <MenuIcon fontSize="large"/>
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </Container>
        
        <Drawer anchor="right" open={this.state.toggleDrawer} onClick={handleDrawerClose} onClose={handleDrawerClose} onKeyDown={handleDrawerClose}>
          <SideDrawer
          isAuthenticated={isAuthenticated}
          logout={this.onLogoutClick} />
        </Drawer>

        <NotificationList notifications={notifications.notification} anchorEl={this.state.anchorEl1} onClose={this.onHideNotification} />
        <UserMenu anchorEl={this.state.anchorEl2} onClose={this.onHideUserMenu} onLogOut={this.onLogoutClick}/>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, checkNotification})(Navbar);