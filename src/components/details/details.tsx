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

  const [locationDetails, setLocationDetails] = useState({
    _id: '',
    state: '',
    town: '',
    comment: '',
    latitude: '',
    longitude: '',
    photos: '',
    author: { name: '' },
  });

  useEffect(() => {
    getDetails(detailsURL).then((resp) => {
      setLocationDetails(resp.data);
      console.log(resp.data);
    });
  }, []);

  const deleteLocation = () => {
    remove(locationDetails._id, user.token).then((resp) => {
      if (resp.statusText.toLowerCase() === 'ok') {
        dispatch(removeLocation(locationDetails._id));
      }
    });
  };

  function handleClick(ev: any) {
    ev.preventDefault();
    deleteLocation();
  }

  return (
    <>
      <h2>Página de detalle de {locationDetails._id}</h2>
      <span className="location-data">
        {locationDetails.state}
        {locationDetails.town}
        {locationDetails.comment}

        {locationDetails.photos}
        {locationDetails.author.name}
      </span>{' '}
      <Link to={`/update/${locationDetails._id}`}>
        <button type="button" role="button" tabIndex={0}>
          Change information
        </button>
      </Link>
      <button
        type="button"
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyPress={handleClick}
      >
        Delete
      </button>
    </>
  );
}

//-<span>{locationDetails.author.name}</span>
