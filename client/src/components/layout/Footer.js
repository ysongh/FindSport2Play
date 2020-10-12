import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Container, Grid, Link, Typography } from '@material-ui/core';

import Logo from '../../img/logo.png';

export default() => {
    return(
        <footer>
            <AppBar className="primary-color marginT-3 pad-2" position="static">
                <Grid component={Container} container>
                    <Grid item xs={12} sm={3}>
                        <img src={Logo} className="logo" alt="Logo" />
                    </Grid>
                    <Grid item xs={12} sm={9} className="footer-links">
                        <Link className="white-link" component={RouterLink} to="/">
                            Home
                        </Link>
                        <span>/</span>
                        <Link className="white-link" component={RouterLink} to="/events">
                            Events List
                        </Link>
                        <span>/</span>
                        <Link className="white-link" component={RouterLink} to="/create-event">
                            Create Event
                        </Link>
                        <span>/</span>
                        <Link className="white-link" component={RouterLink} to="/register">
                            Get Started
                        </Link>
                        <span>/</span>
                        <Link className="white-link" component={RouterLink} to="/termsofservice">
                            Terms
                        </Link>
                        <span>/</span>
                        <Link className="white-link" component={RouterLink} to="/privacypolicy">
                            Privacy
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography className="marginL-d7">
                            Copyright &copy;{new Date().getFullYear()} FindSport2Play
                        </Typography>
                    </Grid>
                </Grid>
            </AppBar>
        </footer>
    );
};