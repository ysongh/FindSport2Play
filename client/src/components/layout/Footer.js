import React from 'react';
import { AppBar, Typography } from '@material-ui/core';

export default() => {
    return(
        <footer>
            <AppBar className="primary-color marginT-3 pad-2" position="static">
                <Typography align="center">
                    Copyright &copy;{new Date().getFullYear()} FindSport2Play
                </Typography>
            </AppBar>
        </footer>
    );
};