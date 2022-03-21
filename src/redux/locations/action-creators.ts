import { actionTypes } from './action-types';

export const loadLocations = (locations: any) => ({
  type: actionTypes.loadLocations,
  payload: locations,
});

export const createLocation = (location: any) => ({
  type: actionTypes.createLocation,
  payload: location,
});
export const removeLocation = (location: any) => ({
  type: actionTypes.removeLocation,
  payload: location,
});

export const updateLocation = (location: any) => ({
  type: actionTypes.updateLocation,
  payload: location,
});
