import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './Home.module.css';
import LandingImg from '../../img/landingImg.png';

class Home extends Component{
  onLogoutClick(e){
      e.preventDefault();
      this.props.logoutUser();
  }
  
  render(){
      const { isAuthenticated } = this.props.auth;
      const {
        header,
        header__text,
        header__buttons,
        header__img } = styles;
      
      const guestLinks = (
        <div className={header__buttons}>
      		<Link to="/register" className="btn btn-lg text-white btn-primary mr-4">Get Started</Link>
      		<Link to="/events" className="btn btn-lg text-white bg-info">See Events</Link>
      	</div>
      );
      
      const userLinks = (
        <div className={header__buttons}>
      		<Link to="/profile" className="btn btn-lg text-white btn-primary mr-4">Go to Your Profile</Link>
          <Link to="/events" className="btn btn-lg text-white bg-info">See Events</Link>
      	</div>
      );

      return(
        <header className={header}>
          <div className={header__text}>
            <h1>Search for players to play sport</h1>
            <p>Pick a day, time, and place to play any sports with someone or group of people</p>
            {isAuthenticated ? userLinks : guestLinks}
          </div>
          <div className={header__img}>
            <img src={LandingImg} alt="Landing" />
          </div>
        </header>
      );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);