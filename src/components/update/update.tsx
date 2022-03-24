/* eslint-disable react/no-typos */
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { Location } from '../../models/location';
import { updateLocation } from '../../redux/locations/action-creators';
import { locationsReducer } from '../../redux/locations/locations-reducers';
import { update, getDetails } from '../../services/api';
import { store } from '../../redux/store'; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

export function Update() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { _id } = useParams();

  const detailsURL = `http://localhost:3600/locations/${_id}`;
  console.log(detailsURL);

  const [locationDetails, setLocationDetails] = useState({
    _id: '',
    state: '',
    town: '',
    comment: '',
    map: '',
    photos: '',
    author: '',
  });

  useEffect(() => {
    getDetails(detailsURL).then((resp) => {
      setLocationDetails(resp.data);
      console.log(resp.data);
    });
  }, []);

  const toggleLocation = (newLocation: any) => {
    update(newLocation, user.token).then((resp) =>
      dispatch(updateLocation(resp.data))
    );
  };

  const [newLocation, setNewLocation] = useState({
    _id: _id,
    state: locationDetails.state,
    town: locationDetails.town,
    comment: locationDetails.comment,
    map: locationDetails.map,
    photos: locationDetails.photos,
  });

  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    console.log('Updated location', newLocation);
    toggleLocation(newLocation);
    setNewLocation({
      _id: _id,
      state: locationDetails.state,
      town: locationDetails.town,
      comment: locationDetails.comment,
      map: locationDetails.map,
      photos: locationDetails.photos,
    });
    console.log(setNewLocation);
  };

  const handleChange = (ev: any) => {
    setNewLocation({ ...newLocation, [ev.target.name]: ev.target.value });
  };

  return (
    <>
      <h2>Update Location</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="state"
          placeholder="Provincia de la localización"
          value={newLocation.state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="town"
          placeholder="Ciudad de la localización"
          value={newLocation.town}
          onChange={handleChange}
        />
        <input
          type="text"
          name="comment"
          placeholder="Comentario de la localización"
          value={newLocation.comment}
          onChange={handleChange}
        />
        <input
          type="text"
          name="map"
          placeholder="Mapa de la localización"
          value={newLocation.map}
          onChange={handleChange}
        />
        <input
          type="text"
          name="photos"
          placeholder="Fotos de la localización"
          value={newLocation.photos}
          onChange={handleChange}
        />
        <input
          type="text"
          name="_id"
          placeholder="id de la localización"
          value={newLocation._id}
          readOnly
        />

        <button type="submit">Update</button>
      </form>
    </>
  );
}
