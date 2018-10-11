import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';
import { getCurrentProfile  } from '../../actions/profileActions';

class Profile extends Component{
  componentDidMount(){
     this.props.getCurrentProfile(this.props.match.params.id);
  }
    
  render(){
    const {user} = this.props.auth;
    const {profile, loading} = this.props.profile;
    
    let profileContent;
    
    if(profile === null || loading){
        profileContent = <Spinner />;
    }
    else{
      if(Object.keys(profile).length > 0){
        profileContent = (
          <div>
            <p className="lead text-muted">{profile.user.name}</p>
            <p>{profile.location}</p>
            <p>{profile.favoriteSport}</p>
            <p>{profile.bio}</p>
            <p><Moment format="MM/DD/YYYY">{profile.date}</Moment></p>
          </div>
        );
      }
      else{
        profileContent = (
          <div>
            <p className="lead text-muted">{user.name}</p>
            <p>You have not yet setup a profile, please add info</p>
            <p className="btn btn-lg btn-info">
              Create Profile
            </p>
          </div>
        );
      }
    }
    
    return(
        <div>
          <h1 className="text-center">Profile</h1>
          {profileContent}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {getCurrentProfile})(Profile); 