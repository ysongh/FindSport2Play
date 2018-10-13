import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

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
    
    onSubmit(e){
        e.preventDefault();
        
        const profileData = {
            handle: this.state.handle,
            location: this.state.location,
            favoriteSport: this.state.favoriteSport,
            bio: this.state.bio
        };
        
        console.log(profileData);
    }
    
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    render(){
        return(
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    info="A unique handle for your profile URL. Your full name, nickname"
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    info="City or city and state suggested (eg. New York, NY)"
                                />
                                <TextFieldGroup
                                    placeholder="* Favorite Sports"
                                    name="favoriteSport"
                                    value={this.state.favoriteSport}
                                    onChange={this.onChange}
                                    info="Please use comma separated values (eg. Baseball,Tennis,Football)"
                                />
                                <TextAreaFieldGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    info="Tell us a little about yourself"
                                />
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(withRouter(CreateProfile));