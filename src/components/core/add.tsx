/* eslint-disable react/no-typos */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Location } from '../../models/location';
import { createLocation } from '../../redux/locations/action-creators';
import { set } from '../../services/api';
import { store } from '../../redux/store'; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

export function Add() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const addLocation = (newLocation: any) => {
    set(newLocation, user.token).then((resp) => {
      dispatch(createLocation(resp.data));
    });
  };

  const [newLocation, setNewLocation] = useState(new Location());

  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    console.log('Added location', newLocation);
    addLocation({
      ...newLocation,
      author: { _id: user.id, name: user.name },
    });
    //addTask({ ...newTask, responsible: { _id: user.id, name: user.userName } });
    setNewLocation(new Location());
  };

  const handleChange = (ev: any) => {
    setNewLocation({ ...newLocation, [ev.target.name]: ev.target.value });
  };

  return (
    <>
      <h2>Add Location</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="state"
          id="state"
          value={newLocation.state}
          onChange={handleChange}
        >
          <option value="Andalucia">Andalucia</option>
          <option value="Aragon">Aragon</option>
          <option value="Asturias">Asturias</option>
          <option value="Baleares">Baleares</option>
          <option value="Canarias">Canarias</option>
          <option value="Cantabria">Cantabria</option>
          <option value="Castilla La Mancha">Castilla La Mancha</option>
          <option value="Castilla y Leon">Castilla Leon</option>
          <option value="Cataluña">Cataluña</option>
          <option value="Extremadura">Extremadura</option>
          <option value="Galicia">Galicia</option>
          <option value="La Rioja">La Rioja</option>
          <option value="Murcia">Murcia</option>
          <option value="Madrid">Madrid</option>
          <option value="Navarra">Navarra</option>
          <option value="Pais Vasco">Pais Vasco</option>
          <option value="Valencia">Valencia</option>
        </select>
        {/* <input
          type="text"
          name="state"
          placeholder="Provincia de la localización"
          value={newLocation.state}
          onChange={handleChange}
          required
        /> */}

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
