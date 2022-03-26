/* eslint-disable react/no-typos */
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Location } from '../../models/location';
import { createLocation } from '../../redux/locations/action-creators';
import { set } from '../../services/api';
import { app } from '../../firebase/firebase';
import { store } from '../../redux/store'; //añadido, supuestamente soluciona el problema

type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

export function Add() {
  const user = useSelector((state: RootState) => state.user);
  const storage = getStorage(app);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addLocation = (newLocation: any) => {
    set(newLocation, user.token).then((resp) => {
      dispatch(createLocation(resp.data));
    });
  };

  const [newLocation, setNewLocation] = useState(new Location());

  const [image, setImage] = useState<any>(null);

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();

    let url = '';
    const imageRef = ref(storage, image.name);
    await uploadBytes(imageRef, image);
    url = await getDownloadURL(imageRef);
    console.log(url);

    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
      addLocation({
        ...newLocation,
        author: { _id: user.id, name: user.name },
        latitude: position.coords.latitude.toString(),
        longitude: position.coords.longitude.toString(),
        photo: url,
      });
      setTimeout(() => {
        navigate('/AllLocations');
      }, 1000);
    });

    console.log('Added location', newLocation);

    //addTask({ ...newTask, responsible: { _id: user.id, name: user.userName } });
    setNewLocation(new Location());
  };

  const handleChange = (ev: any) => {
    setNewLocation({ ...newLocation, [ev.target.name]: ev.target.value });
    //necesita esperar 1 segundo para mostrar en la lista el cambio correctamente.
    // de lo contrario mostraría en la lista la modificacion aplicada a todas las localizaciones
  };

  return (
    <>
      <h2>Add Location</h2>
      <p>
        Have you found a beautiful location into the wild? Please let us know.
      </p>
      <p>
        Your current location will be sent as soon as you push the Add button.
      </p>
      <p>Please allow your web bowser if you're asked to.</p>
      <form onSubmit={handleSubmit}>
        <select
          name="state"
          id="state"
          value={newLocation.state}
          onChange={handleChange}
          required
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
          type="file"
          name="photo"
          placeholder="Foto de la localización"
          onChange={(e: any) => setImage(e.target.files[0])}
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
