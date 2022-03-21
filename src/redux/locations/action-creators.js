import { actionTypes } from './action-types';
import * as api from '../../services/api';

export const loadLocations = (token) => {
    return (dispatch) => {
        api.getAll(token).then((resp) => {
            dispatch({
                type: actionTypes.loadLocations,
                payload: resp.data,
            });
        });
    };
};

export const createLocation = (location) => {
    return (dispatch) => {
        api.set(location).then((resp) => {
            console.log('resp', resp.data);
            dispatch({
                type: actionTypes.createLocation,
                payload: resp.data,
            });
        });
    };
};

export const removeLocation = (location, token) => {
    return (dispatch) => {
        api.remove(location._id, token).then((resp) => {
            console.log(location);
            if (resp.status === 202) {
                dispatch({
                    type: actionTypes.removeLocation,
                    payload: location,
                });
            }
        });
    };
};

export const updateLocation = (location, token) => {
    return (dispatch) => {
        api.update(location, token).then((resp) => {
            dispatch({
                type: actionTypes.updateLocation,
                payload: resp.data,
            });
        });
    };
};
