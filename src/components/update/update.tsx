/* eslint-disable react/no-typos */
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const detailsURL = `http://localhost:3600/locations/${_id}`;
  console.log(detailsURL);

  const [locationUpdate, setLocationUpdate] = useState({
    _id: '',
    state: '',
    town: '',
    comment: '',
    latitude: '',
    longitude: '',
    photo: '',
    author: '',
  });

  useEffect(() => {
    getDetails(detailsURL).then((resp) => {
      setLocationUpdate(resp.data);
      console.log(resp.data);
    });
  }, []);

  const toggleLocation = (newLocation: any) => {
    update(newLocation, user.token).then((resp) =>
      dispatch(updateLocation(resp.data))
    );
    //necesita esperar 1 segundo para mostrar en la lista el cambio correctamente.
    // de lo contrario mostraría en la lista la modificacion aplicada a todas las localizaciones
    setTimeout(() => {
      navigate('/AllLocations');
    }, 1000);
  };

  const [newLocation, setNewLocation] = useState({
    _id: _id,
    state: locationUpdate.state,
    town: locationUpdate.town,
    comment: locationUpdate.comment,
    latitude: locationUpdate.latitude,
    longitude: locationUpdate.longitude,
    photo: locationUpdate.photo,
  });

  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude.toString();
        const longitude = position.coords.longitude.toString();
        console.log('Updated location', newLocation);
        toggleLocation(newLocation);
        setNewLocation({
          _id: _id,
          state: newLocation.state,
          town: newLocation.town,
          comment: newLocation.comment,
          photo: newLocation.photo,
          latitude: latitude,
          longitude: longitude,
        });
      }
      //console.log(setNewLocation);
    );
  };

  const handleChange = (ev: any) => {
    setNewLocation({ ...newLocation, [ev.target.name]: ev.target.value });
  };

  return (
    <>
      <h2>Update Location</h2>
      <p>
        Your current location will substitute the previous one after pressing on
        Modify.
      </p>

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
        {/* <input
          type="text"
          name="map"
          placeholder="Mapa de la localización"
          value={newLocation.map}s
          onChange={handleChange}
        /> */}
        <input
          type="text"
          name="photo"
          placeholder="Fotos de la localización"
          value={newLocation.photo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="_id"
          placeholder="id de la localización"
          value={newLocation._id}
          readOnly
        />

        <button type="submit">Modify</button>
      </form>
    </>
  );
}
