/* eslint-disable react/no-typos */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Location } from '../../models/location';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../firebase/firebase";
import { updateLocation } from "../../redux/locations/action-creators";
import { locationsReducer } from "../../redux/locations/locations-reducers";
import { update, getDetails } from "../../services/api";
import { store } from "../../redux/store"; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

export function Update() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { _id } = useParams();
  const navigate = useNavigate();
  const storage = getStorage(app);

  const detailsURL = `http://localhost:3600/locations/${_id}`;
  console.log(detailsURL);

  const [image, setImage] = useState<any>(null);

  const [locationUpdate, setLocationUpdate] = useState({
    _id: "",
    state: "",
    town: "",
    comment: "",
    latitude: "",
    longitude: "",
    photo: "",
  });

  // extrae la información de la ID que estamos viendo en detalles, setlocationupdate. La pasa al estado que tengo
  // justo encima para definir las propiedades disponibles.
  useEffect(() => {
    getDetails(detailsURL).then((resp) => {
      setLocationUpdate(resp.data);
      console.log(resp.data);
    });
  }, []);

  //efectúa los cambios en la api
  const toggleLocation = (newLocation: any) => {
    update(newLocation, user.token).then((resp) =>
      dispatch(updateLocation(resp.data))
    );
    //necesita esperar 1 segundo para mostrar en la lista el cambio correctamente.
    // de lo contrario mostraría en la lista la modificacion aplicada a todas las localizaciones
    setTimeout(() => {
      navigate("/AllLocations");
    }, 1000);
  };

  //ESTADO QUE NO SÉ BIEN LO QUE HACE.
  const [newLocation, setNewLocation] = useState({
    _id: _id,
    state: locationUpdate.state,
    town: locationUpdate.town,
    comment: locationUpdate.comment,
    latitude: locationUpdate.latitude,
    longitude: locationUpdate.longitude,
    photo: locationUpdate.photo,
  });

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();

    let imageURL = "";
    const imageRef = ref(storage, image.name);
    await uploadBytes(imageRef, image);
    imageURL = await getDownloadURL(imageRef);
    console.log(imageURL);

    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log("Latitude is :", position.coords.latitude.toString());
        console.log("Longitude is :", position.coords.longitude.toString());
        console.log("La url de la imagen es:", imageURL);
        newLocation.latitude = position.coords.latitude.toString();
        newLocation.longitude = position.coords.longitude.toString();
        newLocation.photo = imageURL;
        setNewLocation({
          _id: _id,
          state: newLocation.state,
          town: newLocation.town,
          comment: newLocation.comment,
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
          photo: newLocation.photo,
        });
        toggleLocation(newLocation);
        console.log("Updated location", newLocation);
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
          required
        >
          <option>Choose region</option>
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
          maxLength={25}
          required
        />
        <textarea
          name="comment"
          value={newLocation.comment}
          onChange={handleChange}
          maxLength={180}
          required
        >
          Write a comment here
        </textarea>

        <input
          type="file"
          name="photo"
          onChange={(e: any) => setImage(e.target.files[0])}
          required
        />
        <input
          type="text"
          name="_id"
          placeholder="id de la localización"
          value={newLocation._id}
          readOnly
        />

        <button type="submit" className="button-update">
          Modify
        </button>
      </form>
    </>
  );
}
