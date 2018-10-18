import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';
import ProfileAbout from './ProfileAbout';
import { getUserProfile  } from '../../actions/profileActions';

class UserProfile extends Component{
  componentDidMount(){
     this.props.getUserProfile(this.props.match.params.id);
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
            <p>This user did not setup a profile</p>
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

export default connect(mapStateToProps, {getUserProfile})(UserProfile);