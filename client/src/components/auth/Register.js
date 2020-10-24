import React, { Component } from 'react';
import { Link, withRouter  } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Card, CardContent, CircularProgress, Typography, Button } from '@material-ui/core';

import styles from './Register.module.css';
import TextFieldGroup from '../common/TextFieldGroup';
import { registerUser } from '../../actions/authActions';

class Register extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/events');
      }
    }
    
    componentWillReceiveProps(nextProps){
      if(nextProps.errors){
        this.setState({errors: nextProps.errors});
      }
    }
    
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    onSubmit(e){
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        
        this.props.registerUser(newUser, this.props.history);
    }
    
    render(){
      const {errors} = this.state;
      const {auth} = this.props;

      const {
        register,
        register__card,
        register__info,
        btn__progress } = styles;
      
      return(
        <Grid className={register} container justify="center">
          <Grid item xs={12} sm={8} md={6}>
            <Card className={register__card}>
              <CardContent>
                <Typography className="primary-textColor" variant="h5" paragraph>
                  Sign Up
                </Typography>
                <Typography variant="body2" color="secondary">
                  {errors.servererror}
                </Typography>
                <form noValidate onSubmit={this.onSubmit} className="mb-2">
                  <TextFieldGroup
                    label="Name"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextFieldGroup
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextFieldGroup
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <TextFieldGroup
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />
                  <Typography variant="subtitle2">
                    By creating an account, you accept FindSport2Play <Link to="/termsofservice">Terms of Service</Link> and <Link to="/privacypolicy">Privacy Policy</Link>
                  </Typography>
                  <Button
                    className={auth.loading ? "relative" : "relative primary-color marginT-1"}
                    type="submit"
                    variant="contained"
                    disabled={auth.loading}>
                    Create Account
                    {auth.loading && <CircularProgress size={24} className={btn__progress} />}
                  </Button>
                </form>
                <Typography variant="subtitle2" className={register__info}>
                  Already have an account? <Link to="/login">Sign In</Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));