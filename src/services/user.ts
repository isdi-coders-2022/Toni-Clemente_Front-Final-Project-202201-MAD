import axios from 'axios';

const LOGIN_API = 'http://localhost:3600/login/';

const REGISTER_API = 'http://localhost:3600/users/';

export function login(user: any) {
  return axios.post(LOGIN_API, user);
}

export function register(user: any) {
  return axios.post(REGISTER_API, user);
}
