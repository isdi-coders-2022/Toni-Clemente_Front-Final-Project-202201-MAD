/* eslint-disable react/no-typos */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Location } from '../../models/location';
import { createLocation } from '../../redux/locations/action-creators';
import { store } from '../../redux/store'; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

export function Add() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const addLocation = (newLocation: any) => {
    dispatch(createLocation(newLocation));
  };
  const [newLocation, setNewLocation] = useState(new Location());

  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    console.log('Added location', newLocation);
    addLocation({
      ...newLocation,
      author: { _id: user.id, name: user.name },
    });
    setNewLocation(new Location());
  };

  const handleChange = (ev: any) => {
    setNewLocation({ ...newLocation, [ev.target.name]: ev.target.value });
  };

  return (
    <>
      <h2>Add Location</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="state"
          placeholder="Provincia de la localización"
          value={newLocation.state}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="town"
          placeholder="Ciudad de la localización"
          value={newLocation.town}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="comment"
          placeholder="Comentario de la localización"
          value={newLocation.comment}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="map"
          placeholder="Mapa de la localización"
          value={newLocation.map}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="photos"
          placeholder="Fotos de la localización"
          value={newLocation.photos}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Usuario que subió la localización"
          value={user.name}
          readOnly
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
