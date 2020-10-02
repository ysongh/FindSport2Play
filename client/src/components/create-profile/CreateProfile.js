import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core';

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
            <Grid container justify="center" className="marginX-1">
                <Grid item xs={12} sm={8} md={6}>
                    <Card className="card">
                        <CardContent>
                            <Typography variant="h3" component="h1" align="center" gutterBottom>
                                Create Your Profile
                            </Typography>
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
                                <Button className="primary-color marginB-2" type="submit" variant="contained" fullWidth>
                                    Create
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));