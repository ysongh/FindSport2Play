import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';

import { logoutUser } from '../../actions/authActions';
import { checkNotification } from '../../actions/notificationActions';
import NotificationList from './NotificationList';
import styles from './Navbar.module.css';

import Logo from '../../img/logo.png';

class Navbar extends Component {
  constructor(props){
      super(props);
      this.state = {
          showNotification: false
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
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <button className="btn btn-dark nav-link mr-2" onClick={this.onShowNotification.bind(this)}>
              <i className="far fa-bell notification__icon">
                <sup className={styles.notification__number}>{notifications.unread}</sup>
              </i>
          </button>
          { this.state.showNotification ? notificationList : null }
        </li>
        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <Link to="/profile" className="nav-link">
              Welcome, {user.name}
          </Link>
        </li>
        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <Link to="/" onClick={this.onLogoutClick.bind(this)} className="nav-link btn btn-danger text-white">
              Logout
          </Link>
        </li>
      </ul>
    );
    
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <Link className="nav-link btn btn-primary text-white" to="/register">
            Get Started
          </Link>
        </li>
      </ul>
    );
    
    return (
      <nav className="navbar navbar-expand-sm sticky-top navbar-dark bg-dark">
        <Container>
          <Link className="navbar-brand" to="/">
            <img src={Logo} className="logo" alt="Logo" data-toggle="collapse" data-target=".navbar-collapse.show" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                <Link className="nav-link" to="/events">
                  {' '}
                  List of Events
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </Container>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, checkNotification})(Navbar);