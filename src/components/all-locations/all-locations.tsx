import { Location } from "../core/location";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadLocations } from "../../redux/locations/action-creators";
//import { LOCATIONS } from '../../models/locations.data';
import { getAll } from "../../services/api";
import { store } from "../../redux/store"; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

import "./all-locations.scss";

export function AllLocations() {
  const locations = useSelector((state: RootState) => state.locations); //añadido state: RootState, supuestamente soluciona el problema
  console.log({ locations });
  const dispatch = useDispatch();

  useEffect(() => {
    getAll().then((resp) => {
      console.log(resp);
      dispatch(loadLocations(resp.data));
    });
  }, [dispatch]);

  return (
    <>
      <img src="./img/logo.png"></img>
      {locations.length ? (
        <>
          <h2>Locations list</h2>
          <div className="locations-list">
            {locations.map((location) => (
              <Location location={location} key={location.id} />
            ))}
          </div>
        </>
      ) : (
        "No locations added"
      )}
    </>
  );
}
