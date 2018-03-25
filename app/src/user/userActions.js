import * as types from './userTypes';

const { API_URL } = process.env;

export function userEvent(type, event) {
  return {
    type,
    event,
  };
}

export function userEventError(type, error) {
  return {
    type,
    error,
  };
}

export function getUser() {
  return (dispatch) => {
    dispatch(userEvent(types.GET_USER_REQUEST));
    return fetch(`${API_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
    }).then(resp => resp.json())
      .then((response) => {
        const { error } = response;

        if (error) {
          dispatch(userEventError(types.GET_USER_FAILURE, error));
          return { error };
        }
        dispatch(userEvent(types.GET_USER_SUCCESS, response));
        return { response };
      });
  };
}

