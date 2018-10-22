import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { createEvent } from '../../actions/eventActions';

class CreateEvent extends Component{
    constructor(props){
        super(props);
        this.state = {
            nameofevent: '',
            typeofsport: '',
            numberofplayer: '',
            imageURL: '',
            location: '',
            start: '',
            description: '',
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
        
        const eventData = {
            nameofevent: this.state.nameofevent,
            typeofsport: this.state.typeofsport,
            numberofplayer: this.state.numberofplayer,
            imageURL: this.state.imageURL,
            location: this.state.location,
            start: this.state.start,
            description: this.state.description
        };
        
        this.props.createEvent(eventData, this.props.history);
    }
    
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    render(){
        const {errors} = this.state;
        
        return(
            <div className="create-event">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Host Your Event</h1>
                            <p className="lead text-center">
                                Create your own event for other to play with you
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                  placeholder="* Name of Event"
                                  name="nameofevent"
                                  type="name"
                                  value={this.state.nameofevent}
                                  onChange={this.onChange}
                                  error={errors.nameofevent}
                                />
                                <TextFieldGroup
                                  placeholder="* Type of Sport"
                                  name="typeofsport"
                                  type="name"
                                  value={this.state.typeofsport}
                                  onChange={this.onChange}
                                  error={errors.typeofsport}
                                />
                                <TextFieldGroup
                                  placeholder="* Number of player"
                                  name="numberofplayer"
                                  type="number"
                                  value={this.state.numberofplayer}
                                  onChange={this.onChange}
                                  error={errors.numberofplayer}
                                />
                                <TextFieldGroup
                                  placeholder="Image URL"
                                  name="imageURL"
                                  type="name"
                                  value={this.state.imageURL}
                                  onChange={this.onChange}
                                  error={errors.imageURL}
                                />
                                <TextFieldGroup
                                  placeholder="Location"
                                  name="location"
                                  type="name"
                                  value={this.state.location}
                                  onChange={this.onChange}
                                  error={errors.location}
                                />
                                <TextFieldGroup
                                  name="start"
                                  type="date"
                                  value={this.state.start}
                                  onChange={this.onChange}
                                  error={errors.start}
                                />
                                <TextAreaFieldGroup
                                  placeholder="Description"
                                  name="description"
                                  type="name"
                                  value={this.state.description}
                                  onChange={this.onChange}
                                  error={errors.description}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                          </form>
                          <Link to="/events" className="btn btn-light btn-block mt-1">
                                Cancel
                          </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    event: state.event,
    errors: state.errors
});

export default connect(mapStateToProps, {createEvent})(withRouter(CreateEvent));