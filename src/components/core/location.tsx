import { Link } from 'react-router-dom';
import { store } from '../../redux/store'; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

import './location.scss';

export function Location({ location }: { location: any }) {
  // const user = useSelector((state: RootState) => state.user); // añadido : RootState  al ((state

  return (
    <Link to={`/details/${location._id}`}>
      <div className="location-data">
        <img className="location-data__image" src={`${location.photo}`} />
        <div className="location-data__text">A location in {location.town}</div>
      </div>
    </Link>
  );
}
