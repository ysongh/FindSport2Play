import React, { Component } from 'react';

import Moment from 'react-moment';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component{
    render(){
        const {profile} = this.props;
        
        const favoriteSport = profile.favoriteSport.map((sport, index) => (
            <div key={index} className="p-3">
                <i className="fa fa-check" /> {sport}
            </div>
        ));
        
        
        return(
            <div className="row">
                <div className="col-md-12">
                  <div className="card card-body bg-light mb-3">
                    <div>
                        <p className="lead text-muted">{profile.user.name}</p>
                        <p>From {profile.location}</p>
                        <p>Join on <Moment format="MM/DD/YYYY">{profile.date}</Moment></p>
                    </div>
                    <hr />
                    <h3 className="text-center text-info">Bio</h3>
                    <p className="lead">{isEmpty(profile.bio) ? (<span>No bio</span>) : (<span>{profile.bio}</span>)}
                    </p>
                    <hr />
                    <h3 className="text-center text-info">Favorite Sports</h3>
                    <div className="row">
                      <div className="d-flex flex-wrap justify-content-center align-items-center">
                        {favoriteSport}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}

export default ProfileAbout;