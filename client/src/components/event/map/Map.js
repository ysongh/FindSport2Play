import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import request from 'request-promise';

mapboxgl.accessToken = 'pk.eyJ1Ijoic29uZ3dlYiIsImEiOiJjam04NWdjNXAxMzhsM3FuM2RodmlkZDM1In0.3wNwmidFRlSbKP3xbaYPfw';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -71.0596,
      lat: 42.3605,
      zoom: 8.29
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    
    const mapboxKey = "pk.eyJ1Ijoic29uZ3dlYiIsImEiOiJjam04NWdjNXAxMzhsM3FuM2RodmlkZDM1In0.3wNwmidFRlSbKP3xbaYPfw";
    
    const options = {
        uri: `https://api.mapbox.com/geocoding/v5/mapbox.places/newyork.json?access_token=${mapboxKey}`,
        json: true
    };
        
    request(options)
      .then(res => {
        console.log(res.features[0].center[0]);
        console.log(res.features[0].center[1]);
      }
    );

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
      </div>
    );
  }
}

export default Map;