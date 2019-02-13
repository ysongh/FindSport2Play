import React, { Component } from 'react';
import { Link, withRouter  } from 'react-router-dom';
import { connect } from 'react-redux';

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
      
      return(
          <div className={styles.register}>
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center mt-5">Sign Up</h1>
                    <form noValidate onSubmit={this.onSubmit} className="mb-2">
                      <TextFieldGroup
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        error={errors.name}
                      />
                      <TextFieldGroup
                        placeholder="Email Address"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                      />
                      <TextFieldGroup
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        error={errors.password}
                      />
                      <TextFieldGroup
                        placeholder="Confirm Password"
                        name="password2"
                        type="password"
                        value={this.state.password2}
                        onChange={this.onChange}
                        error={errors.password2}
                      />
                      <input type="submit" className={styles.register__button + ' ' + styles.button__register} />
                    </form>
                    <Link to="/" className={styles.register__button + ' ' + styles.button__goBack}>
                        Go Back
                    </Link>
                  </div>
                </div>
              </div>
          </div>
      );
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));