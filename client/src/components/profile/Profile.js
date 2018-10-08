import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner'
import { getUser } from '../../actions/userActions';

class Profile extends Component{
  componentDidMount(){
     this.props.getUser(this.props.match.params.id);
  }
    
  render(){
      const {user, loading} = this.props.user;
      
      let userContent;
        
        if(user === null || loading){
            userContent = <Spinner />;
        }
        else{
            userContent = (
                <div>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <p><Moment format="MM/DD/YYYY">{user.date}</Moment></p>
                </div>
            );
        }
      
      return(
          <div>
            <h1 className="text-center">Profile</h1>
            {userContent}
          </div>
      );
  }
}

const mapStateToProps = state => ({
  user: state.users
});

export default connect(mapStateToProps, {getUser})(Profile); 