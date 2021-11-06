import React from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import "./Map.css"
import PlacesAutocomplete, {geocodeByAddress,getLatLng,} from 'react-places-autocomplete';

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: '' ,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        mapCenter:{
            lat:8.1965,
            lng:77.2355
        }
    };
      }
   
   
    handleChange = address => {
        this.setState({ address });
      };
     
      handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
              console.log('Success', latLng)
             this.setState({address})
            this.setState({mapCenter:latLng})
            })
          .catch(error => console.error('Error', error));
      };
   
    render() {
      return (
          <div id="googleMap">
        <PlacesAutocomplete

        onError={this._handleError}
        clearItemsOnError={true}
        

                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input id="inputType"
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
        <Map 
             google={this.props.google}
             initialCenter={
                 {
                     lat:this.state.mapCenter.lat,
                     lng:this.state.mapCenter.lng
                    //  lat:8.1965,
                    //  lng:77.2355
                 }
             }
             center={{
                lat:this.state.mapCenter.lat,
                lng:this.state.mapCenter.lng
             }}
                // onClick={this.onMapClicked}
        >
          <Marker 
            position={{
                lat:this.state.mapCenter.lat,
                lng:this.state.mapCenter.lng
            }}
            // onClick={this.onMarkerClick}
            // name={'Current location'} 
        />
   
          {/* <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow> */}
        </Map>
        </div>
      )
    }
  }

  export default GoogleApiWrapper({
    apiKey:'aPI_KEY'
  })(MapContainer)