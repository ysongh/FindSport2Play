import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventItem extends Component{
    onDeleteClick(id){
        console.log("Remove");
    }
    
    render(){
        const {event, auth} = this.props;
        
        return(
            <div className="jumbotron">
                <span className="badge badge-info">Date</span>
                <p>{event.date}</p>
                
                <span className="badge badge-info">Type of Sport</span>
                <p>{event.typeofsport}</p>
                
                <span className="badge badge-info">Number of Player</span>
                <p>{event.numberofplayer}</p>
                
                <span className="badge badge-info">Location</span>
                <p>{event.location}</p>
                
                <span className="badge badge-info">Description</span>
                <p>{event.description}</p>
                
                <p className="font-italic">Host By {auth.user.name}</p>
                
                {event.user === auth.user.id ? (
                    <button 
                        onClick={this.onDeleteClick.bind(this, event._id)}
                        type="button"
                        className="btn btn-danger mr-1" >
                        Delete
                    </button>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(EventItem);