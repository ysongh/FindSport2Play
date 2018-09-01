import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import sportImage from '../../img/sport.png';
import sportsImage from '../../img/sports.gif';
import { logoutUser } from '../../actions/authActions';

class Home extends Component{
  onLogoutClick(e){
      e.preventDefault();
      this.props.logoutUser();
  }
  
  render(){
      const {isAuthenticated} = this.props.auth;
    
      const authLinks = (
        <div>
          <Link to="/events" className="btn btn-lg text-white bg-info">List of Events</Link>
          <Link to="/" className="btn btn-lg text-white bg-info" onClick={this.onLogoutClick.bind(this)}>
              Logout
          </Link>
        </div>
      );
      
      const guestLinks = (
        <div>
          <Link to="/events" className="btn btn-lg text-white bg-info">List of Events</Link>
          <Link to="/register" className="btn btn-lg text-white bg-info">Sign Up</Link>
          <Link to="/login" className="btn btn-lg text-white bg-info">Login</Link>
        </div>
      );
      
      return(
          <div>
            <header className="jumbotron bg-primary mb-0">
          		<div className="container">
          			<h1 className="text-center">Welcome to FindSport2Play</h1>
          			<img className="img-fluid" id="imageSize" src={sportImage} alt="Sport" />
          		</div>
          	</header>
            
          	{isAuthenticated ? authLinks : guestLinks}

            <div className="jumbotron bg-light mb-0">
        		  <div className="container">
        			  <div className="row">
        				  <div className="col-md-5">
        					  <img className="img-fluid rounded-circle float-right" src={sportsImage} alt="Sports"/>
        				  </div>
        				  <div className="col-md-7">
        					  <h1 className="text-center">Start Finding Your Match!</h1>
        				  </div>
        			  </div>
        		  </div>
        	  </div>
        	</div>
      );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Home);