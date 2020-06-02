import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@material-ui/core';

class UserMenu extends Component{
    render(){
        const {anchorEl, onClose} = this.props;
        
        return (
            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose} onClick={onClose}>
                <MenuItem component={Link} to="/profile">My Profile</MenuItem>
                <MenuItem onClick={this.props.onLogOut}>Logout</MenuItem>
            </Menu>
        );
    }
}

export default UserMenu;