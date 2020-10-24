import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Card, CardContent, CircularProgress, Typography, Button } from '@material-ui/core';

import styles from './Login.module.css';
import TextFieldGroup from '../common/TextFieldGroup';
import { loginUser } from '../../actions/authActions';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
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
      if(nextProps.auth.isAuthenticated){
        this.props.history.push('/events');
      }
      if(nextProps.errors){
        this.setState({errors: nextProps.errors});
      }
    }
    
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    onSubmit(e){
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        
        this.props.loginUser(userData);
    }
    
    render(){
        const {errors} = this.state;
        const {auth} = this.props;

        const {
          login,
          login__card,
          login__info,
          btn__progress } = styles;
        
        return(
            <Grid className={login} container justify="center">
              <Grid item xs={12} sm={8} md={6}>
                <Card className={login__card}>
                  <CardContent>
                    <Typography className="primary-textColor" variant="h5" paragraph>
                      Log In
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      {errors.servererror}
                    </Typography>
                    <form onSubmit={this.onSubmit} className="mb-2">
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
                       <Button
                          className={auth.loading ? "relative" : "relative primary-color marginT-1"}
                          type="submit"
                          variant="contained"
                          disabled={auth.loading}>
                          Submit
                          {auth.loading && <CircularProgress size={24} className={btn__progress} />}
                        </Button>
                    </form>
                    <Typography variant="subtitle2" className={login__info}>
                      Dont have an account? <Link to="/register">Sign Up</Link>
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

export default connect(mapStateToProps, {loginUser})(Login);