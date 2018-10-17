import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';
import ProfileAbout from './ProfileAbout';
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
          <ProfileAbout profile={profile} />
        );
      }
      else{
        profileContent = (
          <div>
            <p className="lead text-muted">{user.name}</p>
            <p>You have not yet setup a profile, please add info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
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