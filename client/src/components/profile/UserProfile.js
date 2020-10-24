import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import Spinner from '../common/Spinner';
import ProfileAbout from './ProfileAbout';
import { getUserProfile  } from '../../actions/profileActions';
import styles from './Profile.module.css';

class UserProfile extends Component{
  componentDidMount(){
     this.props.getUserProfile(this.props.match.params.id);
  }
  
  render(){
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
          <div className={styles.profile}>
            <Typography variant="h6" component="p" gutterBottom>
              This user did not setup a profile
            </Typography>
          </div>
        );
      }
    }
    
    return(
        <div className="minHeight">
          <h1 className="primary-textColor text-center">Profile</h1>
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