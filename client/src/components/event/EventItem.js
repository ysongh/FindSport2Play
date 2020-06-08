import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper, Grid, Box, Chip, Avatar, Button, Typography } from '@material-ui/core';

import MapView from './map/MapView';
import styles from './Event.module.css';
import sportImage from '../../img/noImage.svg';
import { deleteEvent, joinEvent } from '../../actions/eventActions';

class EventItem extends Component{
    onDeleteClick(id){
        this.props.deleteEvent(id);
        this.props.history.push('/events');
    }
    
    onJoinClick(id){
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login');
        }
        this.props.joinEvent(id);
    }
    
    render(){
        const {event, auth} = this.props;
        
        return(
            <Paper className="pad-1">
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <span className={styles.labelInfo}>Type of Sport</span>
                        <p>{event.typeofsport}</p>
                        
                        <span className={styles.labelInfo}>Number of Player</span>
                        <p><i className="fas fa-users"></i>{event.numberofplayer}</p>
                        
                        <span className={styles.labelInfo}>Location</span>
                        <p>
                            {event.location ? event.location : "To Be Announced"}
                        </p>
                        
                        <span className={styles.labelInfo}>Start Date</span>
                        <p>
                            {event.start ? <Moment format="MM/DD/YYYY">{event.start}</Moment> : "To Be Announced"}
                        </p>
                        
                        <span className={styles.labelInfo}>Description</span>
                        <p>
                            {event.description ? event.description : "None"}
                        </p>
                        
                        <Typography display="inline">
                             <Link to={`/profile/${event.user._id}`}>
                                Host By {event.user.name}
                            </Link>
                        </Typography>
                        
                        {event.user._id === auth.user.id ? (
                            <Button 
                                onClick={this.onDeleteClick.bind(this, event._id)}
                                variant="contained"
                                color="secondary" >
                                Delete
                            </Button>
                        ) : null}
                        
                       
                    </Grid>
                    <Grid container item xs={12} md={8}>
                        <img style={{height: '350px'}} src={event.imageURL ? event.imageURL : sportImage}
                          alt="Sport" />
                    </Grid>
                </Grid>
                <MapView />
                <hr />
                <Box display="flex">
                    <Button 
                        className="primary-color"
                        onClick={this.onJoinClick.bind(this, event._id)}
                        variant="contained"
                        color="primary" >
                        {auth.isAuthenticated ? "Join This Event" : "Login to Join"}
                    </Button>
                    <p className="marginL-1">{event.numberofplayer - event.listofplayer.length} spots left</p>
                </Box>
                <div className="marginT-1">
                    { event.listofplayer.map((player, index) => {
                        return <Chip
                            key={player._id}
                            className="marginR-1 marginX-1"
                            avatar={<Avatar>{index + 1}</Avatar>} 
                            label={player.name}
                            variant="outlined" />
                    }) }
                </div>
                
            </Paper>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteEvent, joinEvent })(withRouter(EventItem));