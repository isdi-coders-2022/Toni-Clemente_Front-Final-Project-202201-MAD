import { actionTypes } from './action-types';
const initialState = {
  token: '',
  name: '',
  id: '',
  isLogged: false,
};

export function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case actionTypes.login:
      state = { ...action.payload, isLogged: true };
      return state;
    case actionTypes.logout:
      state = initialState;
      return state;
    default:
      return state;
  }
}
