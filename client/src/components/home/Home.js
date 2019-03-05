import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './Home.module.css';
import sportsImage from '../../img/sports.gif';

class Home extends Component{
  onLogoutClick(e){
      e.preventDefault();
      this.props.logoutUser();
  }
  
  render(){
      const { isAuthenticated } = this.props.auth;
      
      const guestLinks = (
        <div className={styles.header__buttons}>
      		<Link to="/register" className="btn btn-lg text-white bg-info mr-1">Sign Up</Link>
      		<Link to="/login" className="btn btn-lg text-white bg-info">Login</Link>
      	</div>
      );
      
      const userLinks = (
        <div className={styles.header__buttons}>
      		<Link to="/profile" className="btn btn-lg text-white bg-info mr-1">Go to Your Profile</Link>
      	</div>
      );
      
      return(
          <div>
            <header className={styles.header}>
          		<h1 className={styles.header__title}>Welcome to FindSport2Play</h1>
          		<p className={styles.header__text}>Find someone to play sport with</p>
          		{isAuthenticated ? userLinks : guestLinks}
          		<div className={styles.event}>
          		  <div className="container">
          			  <div className="row">
          				  <div className="col-md-5">
          					  <img className="img-fluid rounded-circle float-right" src={sportsImage} alt="Sports"/>
          				  </div>
          				  <div className="col-md-7 text-center">
          					  <h1 className={styles.event__title}>Start Finding Your Match!</h1>
          					  <Link to="/events" className="btn btn-lg text-white bg-info">Go to Events</Link>
          				  </div>
          			  </div>
          		  </div>
          	  </div>
          	</header>
        	</div>
      );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);