import React, { Component } from 'react';
import { Container, Typography } from '@material-ui/core';

class PrivacyPolicy extends Component{
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  
  render(){
      return(
        <Container maxWidth="lg" className="minHeight">
          <h1 className="primary-textColor">Privacy Policy</h1>

          <Typography variant="h6">
            This web app may collects data such as:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                Name
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Email
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Location
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Favorite Sports
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Bio
              </Typography>
            </li>
          </ul>  
          
          <Typography variant="h6" paragraph>
            We only use your data for this web app.
          </Typography>

          <Typography variant="h6" paragraph>
            You can contact us to remove your data and account.
          </Typography>

          <Typography variant="h6">
            If you do not want us to collect your data, then do not use this web app.
          </Typography>
        </Container>
      );
  }
}

export default PrivacyPolicy;