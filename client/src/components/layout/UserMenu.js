import React, { Component } from 'react';
import { Menu, MenuItem } from '@material-ui/core';

class UserMenu extends Component{
    render(){
        const {anchorEl, onClose} = this.props;
        
        return (
            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
                <MenuItem>My Profile</MenuItem>
                <MenuItem>Logout</MenuItem>
            </Menu>
        );
    }
}

export default UserMenu;