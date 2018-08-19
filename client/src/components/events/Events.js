import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import sportImage from '../../img/sport.png';

class Events extends Component{
    render(){
        return(
            <div>
                <h1>List of Events</h1>
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

export default Events;