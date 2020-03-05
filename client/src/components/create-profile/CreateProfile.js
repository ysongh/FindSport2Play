import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            handle: '',
            location: '',
            favoriteSport: '',
            bio: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }
    
    onSubmit(e){
        e.preventDefault();
        
        const profileData = {
            handle: this.state.handle,
            location: this.state.location,
            favoriteSport: this.state.favoriteSport,
            bio: this.state.bio
        };
        
        this.props.createProfile(profileData, this.props.history);
    }
    
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    render(){
        const {errors} = this.state;
        
        return(
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-5 text-center mt-4">Create Your Profile</h1>
                            <small className="d-block my-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    label="Profile Handle *"
                                    placeholder="Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL."
                                />
                                <TextFieldGroup
                                    label="Location"
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                />
                                <TextFieldGroup
                                    label="Favorite Sports *"
                                    placeholder="Favorite Sports"
                                    name="favoriteSport"
                                    value={this.state.favoriteSport}
                                    onChange={this.onChange}
                                    error={errors.favoriteSport}
                                    info="Please use comma separated values (eg. Baseball,Tennis,Football)"
                                />
                                <TextAreaFieldGroup
                                    label="Bio"
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                />
                                <input type="submit" value="Submit" className="btn btn-info btn-block my-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));