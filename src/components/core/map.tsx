import React from 'react';
import * as dotenv from 'dotenv';
dotenv.config();
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
const UserMap = (props: any) => {
  const userInfo = {
    center: {
      lat: props.userLat,
      lng: props.userLong,
    },
    zoom: 10,
  };
  const renderMarker = (map: any, maps: any) => {
    const marker = new maps.Marker({
      position: userInfo.center,
      map,
      title: 'User Location',
    });
    return marker;
  };
  return (
    <div className="user-map" style={{ height: '600px', width: '600px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_googleKey }} // My Google API is stored in the .env file in front-end
        defaultCenter={userInfo.center}
        defaultZoom={userInfo.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => {
          renderMarker(map, maps);
        }}
      ></GoogleMapReact>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    userLat: state.userState.userLat,
    userLong: state.userState.userLong,
  };
};
export default connect(mapStateToProps)(UserMap);
