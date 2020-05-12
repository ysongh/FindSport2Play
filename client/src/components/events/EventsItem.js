import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Card, CardHeader, CardContent, CardActions, Chip, Button, Typography } from '@material-ui/core';

import sportImage from '../../img/noImage.svg';

class EventsItem extends Component{
    render(){
        const {event} = this.props;
        
        return(
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <Card>
                    <CardHeader title={event.nameofevent} />
                    <Link to={`/event/${event._id}`}>
                        <img className="card-img-top" style={{height: '220px'}} src={event.imageURL ? event.imageURL : sportImage}
                          alt="Sport" />
                    </Link>
                    <CardContent>
                        <Chip label={event.typeofsport}/>
                        <Typography variant="h5" component="p">
                            <i className="fas fa-users"></i> {event.numberofplayer}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="large" variant="contained" color="primary" fullWidth="true"  component={Link} to={`/event/${event._id}`}>
                            <Typography color="textPrimary">
                                More Info
                            </Typography>
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

export default connect(null)(EventsItem);