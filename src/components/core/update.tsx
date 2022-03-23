/* eslint-disable react/no-typos */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Location } from '../../models/location';
import { updateLocation } from '../../redux/locations/action-creators';
import { locationsReducer } from '../../redux/locations/locations-reducers';
import { update } from '../../services/api';
import { store } from '../../redux/store'; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

export function Update({ location }: { location: any }) {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const toggleLocation = (newLocation: any) => {
    update(newLocation, user.token).then((resp) =>
      dispatch(updateLocation(resp.data))
    );
  };

  const [newLocation, setNewLocation] = useState({
    _id: location._id,
    state: location.state,
    town: location.town,
    comment: location.comment,
    map: location.map,
    photos: location.photos,
  });

  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    console.log('Updated location', newLocation);
    toggleLocation(newLocation);
    // setNewLocation({
    //   _id: location._id,
    //   state: location.state,
    //   town: location.town,
    //   comment: location.comment,
    //   map: location.map,
    //   photos: location.photos,
    // });
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

        <button type="submit">Update</button>
      </form>
    </>
  );
}
