import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';

import EventsList from './EventsList';
import SelectFieldGroup from '../common/SelectFieldGroup';
import Spinner from '../common/Spinner';
import { getEvents } from '../../actions/eventActions';

const sportList = ["Badminton", "Tennis", "Volleyball", "Basketball", "Baseball", "Running", "Table tennis", "Football", "Soccer"];

class Events extends Component{
    constructor(props){
        super(props);
        this.state = {
            typeofsport: ''
        };
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount(){
        window.scrollTo(0, 0);
        this.props.getEvents();
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    render(){
        const {events, loading} = this.props.events;
        let eventContent;
        
        if(events === null || loading){
            eventContent = <Spinner />;
        }
        else{
            eventContent = (
                <Grid container spacing={2}>
                    <EventsList events={events} />
                </Grid>
            );
        }
        
        return(
            <div>
                <Grid container className="marginX-1">
                    <Grid item xs={12} sm={6} md={6}>
                        <Typography className="marginT-2" variant="h3" component="h1">
                            List of Events
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                    <SelectFieldGroup
                        label="Search Sport by Type"
                        name="typeofsport"
                        type="name"
                        value={this.state.typeofsport}
                        onChange={this.onChange}
                        sportList={sportList}
                    />
                    </Grid>
                </Grid>
                { events.length ? eventContent : (
                    <Typography className="marginT-2" variant="subtitle1" color="secondary" component="p">
                       No Events Yet
                    </Typography>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    events: state.events
});

export default connect(mapStateToProps, { getEvents})(Events);