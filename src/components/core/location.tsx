import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { store } from '../../redux/store'; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

export function Location({ location }: { location: any }) {
  // const user = useSelector((state: RootState) => state.user); // añadido : RootState  al ((state

  return (
    <li>
      <Link to={`/details/${location._id}`}>
        <span className="location-data">
          {location.state}
          {location.town}
          {location.comment}
          {location.map}
          {location.photo}
        </span>{' '}
        -<span>{location.author.name}</span>
      </Link>
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
