import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import axios from '../../axios-lists';

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
        
        this.props.registerUser(newUser);
        
        axios.post('/api/users/register', newUser)
          .then(res => console.log(res.data))
          .catch(err => this.setState({errors: err.response.data}));
    }
    
    render(){
      const {errors} = this.state;
      
      const {user} = this.props.auth;
      
      return(
          <div className="register">
            {user ? user.name: null}
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <form noValidate onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <input type="text"
                          className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.name
                          })}
                          placeholder="Name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange} />
                          {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                      </div>
                      <div className="form-group">
                        <input type="email"
                          className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.email
                          })}
                          placeholder="Email Address"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange} />
                          {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                      </div>
                      <div className="form-group">
                        <input type="password"
                          className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password
                          })}
                          placeholder="Password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange} />
                          {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                      </div>
                      <div className="form-group">
                        <input type="password"
                          className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password2
                          })}
                          placeholder="Confirm Password"
                          name="password2"
                          value={this.state.password2}
                          onChange={this.onChange} />
                          {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                      </div>
                      <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                    <Link to="/" className="btn btn-light">
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
  auth: state.auth
});

export default connect(mapStateToProps, {registerUser})(Register);