import * as types from './locationsTypes';

const { API_URL } = process.env;

export function locationEvent(type, event) {
  return {
    type,
    event,
  };
}

export function locationEventError(type, error) {
  return {
    type,
    error,
  };
}

export function getLocations() {
  return (dispatch) => {
    dispatch(locationEvent(types.GET_LOCATIONS_REQUEST));

    return fetch(`${API_URL}/locations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(resp => resp.json())
      .then((response) => {
        const { error } = response;

        if (error) {
          dispatch(locationEventError(types.GET_LOCATIONS_FAILED, error));
          return { error };
        }
        dispatch(locationEvent(types.GET_LOCATIONS_SUCCESS, response));
        return { response };
      });
  };
}

