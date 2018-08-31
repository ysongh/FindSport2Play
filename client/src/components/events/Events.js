import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

import sportImage from '../../img/sport.png';

class Events extends Component{
    onLogoutClick(e){
        e.preventDefault();
        this.props.logoutUser();
    }
    
    render(){
        const {isAuthenticated} = this.props.auth;
    
        const authLinks = (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">
                  Logout
              </a>
            </li>
          </ul>
        );
        return(
            <div>
                <h1>List of Events</h1>
                {isAuthenticated ? authLinks : null}
                <div className="row">
                    <div className="col">
                        <div className="card" style={{width: '18rem'}}>
                            <img className="card-img-top" src={sportImage} alt="Event" />
                            <div className="card-body">
                                <h5 className="card-title">Title</h5>
                                <p className="card-text">Type of Sport</p>
                                <p className="card-text">Number of Players</p>
                                <Link to="/">More Info</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                         <div className="card" style={{width: '18rem'}}>
                            <img className="card-img-top" src={sportImage} alt="Event" />
                            <div className="card-body">
                                <h5 className="card-title">Title</h5>
                                <p className="card-text">Type of Sport</p>
                                <p className="card-text">Number of Players</p>
                                <Link to="/">More Info</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                         <div className="card" style={{width: '18rem'}}>
                            <img className="card-img-top" src={sportImage} alt="Event" />
                            <div className="card-body">
                                <h5 className="card-title">Title</h5>
                                <p className="card-text">Type of Sport</p>
                                <p className="card-text">Number of Players</p>
                                <Link to="/">More Info</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col">
                        <div className="card" style={{width: '18rem'}}>
                            <img className="card-img-top" src={sportImage} alt="Event" />
                            <div className="card-body">
                                <h5 className="card-title">Title</h5>
                                <p className="card-text">Type of Sport</p>
                                <p className="card-text">Number of Players</p>
                                <Link to="/">More Info</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                         <div className="card" style={{width: '18rem'}}>
                            <img className="card-img-top" src={sportImage} alt="Event" />
                            <div className="card-body">
                                <h5 className="card-title">Title</h5>
                                <p className="card-text">Type of Sport</p>
                                <p className="card-text">Number of Players</p>
                                <Link to="/">More Info</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                         <div className="card" style={{width: '18rem'}}>
                            <img className="card-img-top" src={sportImage} alt="Event" />
                            <div className="card-body">
                                <h5 className="card-title">Title</h5>
                                <p className="card-text">Type of Sport</p>
                                <p className="card-text">Number of Players</p>
                                <Link to="/">More Info</Link>
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

export default connect(mapStateToProps, {logoutUser})(Events);