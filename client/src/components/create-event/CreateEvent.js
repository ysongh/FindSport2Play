import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectFieldGroup from '../common/SelectFieldGroup';
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
    componentDidMount() {
        window.scrollTo(0, 0);
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
            <div className="create-event mt-2 mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Host Your Event</h1>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                  label="Event Name *"
                                  placeholder="Event Name"
                                  name="nameofevent"
                                  type="name"
                                  value={this.state.nameofevent}
                                  onChange={this.onChange}
                                  error={errors.nameofevent}
                                />
                                <SelectFieldGroup
                                  label="Type of Sport *"
                                  name="typeofsport"
                                  type="name"
                                  value={this.state.typeofsport}
                                  onChange={this.onChange}
                                  error={errors.typeofsport}
                                />
                                <TextFieldGroup
                                  label="Number of player *"
                                  placeholder="Number of player"
                                  name="numberofplayer"
                                  type="number"
                                  value={this.state.numberofplayer}
                                  onChange={this.onChange}
                                  error={errors.numberofplayer}
                                />
                                <TextFieldGroup
                                  label="Image URL"
                                  placeholder="Image URL"
                                  name="imageURL"
                                  type="name"
                                  value={this.state.imageURL}
                                  onChange={this.onChange}
                                  error={errors.imageURL}
                                />
                                <TextFieldGroup
                                  label="Location"
                                  placeholder="Location"
                                  name="location"
                                  type="name"
                                  value={this.state.location}
                                  onChange={this.onChange}
                                  error={errors.location}
                                />
                                <TextFieldGroup
                                  label="Date"
                                  name="start"
                                  type="date"
                                  value={this.state.start}
                                  onChange={this.onChange}
                                  error={errors.start}
                                />
                                <TextAreaFieldGroup
                                  label="Description"
                                  placeholder="Details about this event"
                                  name="description"
                                  type="name"
                                  value={this.state.description}
                                  onChange={this.onChange}
                                  error={errors.description}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                          </form>
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