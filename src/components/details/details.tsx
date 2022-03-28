import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetails, remove } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { removeLocation } from "../../redux/locations/action-creators";
import { store } from "../../redux/store"; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

import "./details.scss";

export function Details() {
  const user = useSelector((state: RootState) => state.user); // añadido : RootState  al ((state

  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let gmapsLink = "";

  const detailsURL = `http://localhost:3600/locations/${_id}`;
  console.log(detailsURL);

  const [locationDetails, setLocationDetails] = useState({
    _id: "",
    state: "",
    town: "",
    comment: "",
    latitude: "",
    longitude: "",
    photo: "",
    author: { name: "" },
  });

  useEffect(() => {
    getDetails(detailsURL).then((resp) => {
      setLocationDetails(resp.data);
      console.log(resp.data);
    });
  }, []);

  const deleteLocation = () => {
    remove(locationDetails._id, user.token).then((resp) => {
      if (resp.statusText.toLowerCase() === "ok") {
        dispatch(removeLocation(locationDetails._id));
      }
      navigate("/AllLocations");
    });
  };

  function handleClick(ev: any) {
    ev.preventDefault();
    deleteLocation();
  }

  function handleClickLink() {
    navigator.geolocation.getCurrentPosition(function (position) {
      const origLatitude = position.coords.latitude.toString();
      const origLongitude = position.coords.longitude.toString();
      gmapsLink = `https://www.google.com/maps/dir/?api=1&origin=${origLatitude},${origLongitude}&destination=${locationDetails.latitude},${locationDetails.longitude}`;
      window.open(gmapsLink, "_newtab");
    });
  }

  return (
    <>
      <h2>A location in {locationDetails.town}</h2>
      <div className="location-details">
        <div className="location-details__image">
          <img src={`${locationDetails.photo}`} />
          <p>Location uploaded by {locationDetails.author.name}</p>
        </div>
        <div className="location-details__info">
          <div className="location-details__info1">
            A location in {locationDetails.town}, {locationDetails.state}
          </div>
          <div className="location-details__info2">
            {locationDetails.comment}
          </div>
        </div>
      </div>
      <div className="buttons">
        <Link to={`/update/${locationDetails._id}`}>
          <button
            type="button"
            role="button"
            className="button-details"
            tabIndex={0}
          >
            Change information
          </button>
        </Link>
        <button
          type="button"
          role="button"
          className="button-details"
          tabIndex={0}
          onClick={handleClick}
          onKeyPress={handleClick}
        >
          Delete
        </button>

        <button
          type="button"
          role="button"
          className="button-details"
          tabIndex={0}
          onClick={handleClickLink}
          onKeyPress={handleClickLink}
        >
          How to Go
        </button>
      </div>
    </>
  );
}

//-<span>{locationDetails.author.name}</span>
