import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';

import styles from './Home.module.css';
import LandingImg from '../../img/landingImg.png';
import HowitworkImg1 from '../../img/howitworkImg1.png';
import HowitworkImg2 from '../../img/howitworkImg2.png';
import StepsImg from '../../img/stepsImg.png';

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
        header__img,
        howItWork,
        howItWork__container,
        howItWork__text,
        howItWork__imgReverse,
        steps__text,
        steps__list } = styles;
      
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
        <Container maxWidth="lg">
          <header className={header}>
            <div className={header__text}>
              <h1>Search for players to play sport</h1>
              <p>Pick a day, time, and place to play any sports with someone or group of people</p>
              {isAuthenticated ? userLinks : guestLinks}
            </div>
            <img src={LandingImg} alt="Landing" className={header__img}/>
          </header>
          
          <main>
            <div className={howItWork}>
              <div className={howItWork__container}>
                <img src={StepsImg} alt="HowitworkImg2" />
                <div className={steps__text}>
                  <h2>It easy to find someone to play with!</h2>
                  <ol className={steps__list}>
                    <li>Set up your account</li>
                    <li>Post an event to meet</li>
                    <li>Wait for players to join you</li>
                    <li>Meet your players to play with</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className={howItWork}>
              <div className={howItWork__container}>
                <img src={HowitworkImg1} className={howItWork__imgReverse} alt="HowitworkImg1" />
                <div className={howItWork__text}>
                  <h2>Search for Event</h2>
                  <p>You can find any sport event that was post by player to join</p>
      		        <Link to="/events" className="btn btn-lg text-white bg-info">See Events</Link>
                </div>
              </div>

              <div className="mb-5"></div>

              <div className={howItWork__container}>
                <img src={HowitworkImg2} alt="HowitworkImg2" />
                <div className={howItWork__text}>
                  <h2>Create an Event</h2>
                  <p>You can create event so that any player to join you to play together</p>
                  <Link to="/create-event" className="btn btn-lg text-white btn-primary mr-4">Post Event</Link>
                </div>
              </div>
            </div>
          </main>
        </Container>
      );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);