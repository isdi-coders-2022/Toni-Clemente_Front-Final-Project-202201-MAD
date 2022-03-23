import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDetails, remove } from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { removeLocation } from '../../redux/locations/action-creators';
import { store } from '../../redux/store'; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

export function Details() {
  const user = useSelector((state: RootState) => state.user); // añadido : RootState  al ((state
  //const dispatch = useDispatch();
  const { _id } = useParams();
  const dispatch = useDispatch();

  const detailsURL = `http://localhost:3600/locations/${_id}`;
  console.log(detailsURL);

  const [locationDetails, setLocationDetails] = useState({});

  useEffect(() => {
    getDetails(detailsURL).then((resp) => {
      setLocationDetails(resp.data);
      console.log(resp.data);
    });
  }, []);

  const deleteLocation = () => {
    remove(_id, user.token).then((resp) => {
      if (resp.statusText.toLowerCase() === 'ok') {
        dispatch(removeLocation(_id));
      }
    });
  };

  function handleClick(ev: any) {
    ev.preventDefault();
    deleteLocation();
  }

  // const [robotDetails, setRobotDetails] = useState({});

  // useEffect(() => {
  //   getDetails(detailsURL).then((resp) => {
  //     setRobotDetails(resp.data);
  //   });
  // }, []);

  return (
    <>
      <h2>Página de detalle de {locationDetails._id}</h2>
      <Link to={`/update/${locationDetails._id}`}>
        <span className="location-data">
          {locationDetails.state}
          {locationDetails.town}
          {locationDetails.comment}
          {locationDetails.map}
          {locationDetails.photos}locationDetails
        </span>{' '}
      </Link>
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyPress={handleClick}
      >
        🗑️
      </div>
    </>
  );
}

//-<span>{locationDetails.author.name}</span>
