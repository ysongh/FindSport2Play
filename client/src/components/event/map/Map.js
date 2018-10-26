import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import request from 'request-promise';

const MAPBOX_KEY =`${process.env.REACT_APP_MAPBOX_KEY}`;

mapboxgl.accessToken = MAPBOX_KEY;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 8
    };
  }

  componentDidMount() {
    let { zoom } = this.state;
    
    const location = this.props.location;
    
    const options = {
        uri: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${MAPBOX_KEY}`,
        json: true
    };
        
    request(options)
      .then(res => {
        const lng = res.features[0].center[0];
        const lat = res.features[0].center[1];
        
        let center = [lng, lat];

        new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v9',
          center: center,
          zoom
        });
      }
    );
  }

  render() {

    return (
      <div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
      </div>
    );
  }
}

export default Map;