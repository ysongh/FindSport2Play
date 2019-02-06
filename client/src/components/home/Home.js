import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.module.css';
import sportsImage from '../../img/sports.gif';

class Home extends Component{
  onLogoutClick(e){
      e.preventDefault();
      this.props.logoutUser();
  }
  
  render(){
      return(
          <div>
            <header className={styles.header}>
          		<h1 className={styles.header__title}>Welcome to FindSport2Play</h1>
          		<p className={styles.header__text}>Find someone to play sport with</p>
          	</header>

            <div className="jumbotron bg-light mb-0">
        		  <div className="container">
        			  <div className="row">
        				  <div className="col-md-5">
        					  <img className="img-fluid rounded-circle float-right" src={sportsImage} alt="Sports"/>
        				  </div>
        				  <div className="col-md-7 text-center">
        					  <h1>Start Finding Your Match!</h1>
        					  <Link to="/events" className="btn btn-lg text-white bg-info">Go to Events</Link>
        				  </div>
        			  </div>
        		  </div>
        	  </div>
        	</div>
      );
  }
}

export default Home;