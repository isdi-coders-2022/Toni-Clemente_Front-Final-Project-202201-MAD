import axios from 'axios';

const LOCATIONS_API = 'http://localhost:3600/locations/';

export function getAll() {
  return axios.get(LOCATIONS_API);
  // return fetch(LOCATIONS_API).then(resp => resp.json())
}
export function get(id: any) {
  return axios.get(LOCATIONS_API + id);
  // return fetch(LOCATIONS_API+id).then(resp => resp.json())
}
export function set(location: any, token: any) {
  console.log({ location });
  return axios.post(LOCATIONS_API, location, {
    headers: { authorization: 'Bearer ' + token },
  });
  /* return fetch(LOCATIONS_API, {
        method: 'POST',
        body: JSON.stringify(location),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }) */
}
export function update(location: any, token: any) {
  return axios.patch(LOCATIONS_API + location._id, location, {
    headers: { authorization: 'Bearer ' + token },
  });
}
export function remove(id: any, token: any) {
  return axios.delete(LOCATIONS_API + id, {
    headers: { authorization: 'Bearer ' + token },
  });
}

export function getDetails(url: any) {
  return axios.get(url);
}
