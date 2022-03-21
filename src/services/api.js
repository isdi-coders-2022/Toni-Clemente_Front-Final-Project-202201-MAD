import axios from 'axios';

const LOCATIONS_API = 'http://localhost:3600/locations/';

export function getAll() {
  return axios.get(LOCATIONS_API);
  // return fetch(LOCATIONS_API).then(resp => resp.json())
}
export function get(id) {
  return axios.get(LOCATIONS_API + id);
  // return fetch(LOCATIONS_API+id).then(resp => resp.json())
}
export function set(location) {
  console.log({ location });
  return axios.post(LOCATIONS_API, location);
  /* return fetch(LOCATIONS_API, {
        method: 'POST',
        body: JSON.stringify(location),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }) */
}
export function update(location, token) {
  return axios.patch(LOCATIONS_API + location._id, location, {
    headers: { authorization: 'Bearer ' + token },
  });
}
export function remove(id, token) {
  return axios.delete(LOCATIONS_API + id, {
    headers: { authorization: 'Bearer ' + token },
  });
}
