import React, { Component } from 'react';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { markerIcon } from './MapIcons';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.0423477,
      lng: -100.4082212,
      zoom: 13,
    }
  }

  render() {
    const position = [this.props.coordinates[1] || this.state.lat, this.props.coordinates[0] || this.state.lng];

    return (
        <Map className="map" center={position} zoom={this.state.zoom}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={markerIcon}>
              <Popup>
                {this.props.location}
              </Popup>
            </Marker>
        </Map>
    )
  }
}

export default MapView;