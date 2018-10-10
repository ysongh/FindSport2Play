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
      const {profile, loading} = this.props.profile;
      
      let profileContent;
        
        if(profile === null || loading){
            profileContent = <Spinner />;
        }
        else{
            profileContent = (
                <div>
                  <p>{profile.handle}</p>
                  <p>{profile.location}</p>
                  <p>{profile.bio}</p>
                  <p><Moment format="MM/DD/YYYY">{profile.date}</Moment></p>
                </div>
            );
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
  profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile})(Profile); 