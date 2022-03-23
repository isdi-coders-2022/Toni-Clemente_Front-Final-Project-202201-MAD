import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  removeLocation,
  updateLocation,
} from '../../redux/locations/action-creators';
import { remove } from '../../services/api';
import { Update } from './update';
import { store } from '../../redux/store'; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

//import { Update } from './update'; // aun no existe, añadir despues

export function Location({ location }: { location: any }) {
  const user = useSelector((state: RootState) => state.user); // añadido : RootState  al ((state

  // const deleteLocation = (locationToDelete: any) => {
  //   dispatch(removeLocation(locationToDelete, user.token));
  // };

  return (
    <li>
      <Link to={`/details/${location._id}`}>
        <span className="location-data">
          {location.state}
          {location.town}
          {location.comment}
          {location.map}
          {location.photos}
        </span>{' '}
        -<span>{location.author.name}</span>
      </Link>

      <Update location={location} />
    </li>
  );
}

/* export function Task({task, deleteTask}) {
    return (
        <li>
            <div>{task}</div>
        </li>
    );
} */
