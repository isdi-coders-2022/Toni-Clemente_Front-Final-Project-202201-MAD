/* eslint-disable no-underscore-dangle */
import { actionTypes } from './action-types';

const initialState: Array<any> = [];

export const locationsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.loadLocations:
      return [...action.payload];
    case actionTypes.createLocation:
      return [...state, action.payload];
    case actionTypes.removeLocation:
      return state.filter((item) => item._id !== action.payload._id);
    case actionTypes.updateLocation:
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    default:
      return state;
  }
};
