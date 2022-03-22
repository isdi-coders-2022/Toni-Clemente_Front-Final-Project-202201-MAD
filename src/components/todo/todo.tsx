import './todo.css';
import { Add } from './add';
import { Location } from './location';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadLocations } from '../../redux/locations/action-creators';
//import { LOCATIONS } from '../../models/locations.data';
import { getAll } from '../../services/api';
import { store } from '../../redux/store'; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

export function ToDo() {
  const locations = useSelector((state: RootState) => state.locations); //añadido state: RootState, supuestamente soluciona el problema
  console.log({ locations });
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const URL = "http://3600/robots";
  //   dispatch(loadRobots(ROBOTS));
  // }, []);

  useEffect(() => {
    getAll().then((resp) => {
      console.log(resp);
      dispatch(loadLocations(resp.data));
    });
  }, [dispatch]);

  return (
    <>
      <Add />
      {locations.length ? (
        <>
          <h2>Lista de localizaciones</h2>
          <ul className="locations-list">
            {locations.map((location) => (
              <Location location={location} key={location.id} />
            ))}
          </ul>
        </>
      ) : (
        ''
      )}
    </>
  );
}
