/* eslint-disable react/no-typos */
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Location } from "../../models/location";
import { createLocation } from "../../redux/locations/action-creators";
import { set } from "../../services/api";
import { app } from "../../firebase/firebase";
import { store } from "../../redux/store";

import "./add.scss";

type RootState = ReturnType<typeof store.getState>;

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
    console.log(user);

    let url = "";
    const imageRef = await ref(storage, image.name);
    await uploadBytes(imageRef, image);
    url = await getDownloadURL(imageRef);

    navigator.geolocation.getCurrentPosition(function (position) {
      addLocation({
        ...newLocation,
        author: { _id: user.id, name: user.name },
        latitude: position.coords.latitude.toString(),
        longitude: position.coords.longitude.toString(),
        photo: url,
      });

      setTimeout(() => {
        navigate("/AllLocations");
      }, 1000);
    });

    console.log("Added location", newLocation);

    //setNewLocation(new Location());
  };

  const handleChange = (ev: any) => {
    setNewLocation({ ...newLocation, [ev.target.name]: ev.target.value });
  };

  return (
    <>
      <h2>Add Location</h2>
      <p>
        Have you found a beautiful location into the wild? Just add it here.
        Your current location will be saved, so that you or others can visit it
        anytime.
      </p>
      <p>
        Please allow your web bowser to share your location if you're asked to.
      </p>
      <br />
      <p>
        First, let us know about the region where you are and the closest city
        to your location.
      </p>
      <form onSubmit={handleSubmit}>
        <select
          name="state"
          id="state"
          value={newLocation.state}
          onChange={handleChange}
          className="state-add"
          required
        >
          <option value="">Choose region</option>
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
          placeholder="Location town"
          value={newLocation.town}
          onChange={handleChange}
          maxLength={18}
          className="town-add"
          required
        />

        <p>
          Then tell us about the beauty of your location, how you reached it,
          possibilities for camping, caravanning... or just tell us whatever you
          want about it!
        </p>
        <textarea
          name="comment"
          value={newLocation.comment}
          onChange={handleChange}
          maxLength={140}
          className="comment-add"
          required
        >
          Write a comment here
        </textarea>

        <p>
          Finally, just add a photograph of your location. A good representation
          of it.
        </p>
        <input
          type="file"
          name="photo"
          placeholder="Foto de la localización"
          onChange={(e: any) => setImage(e.target.files[0])}
          required
        />
        <br />

        <button type="submit" role="submit" className="button-add">
          Add
        </button>
      </form>
    </>
  );
}
