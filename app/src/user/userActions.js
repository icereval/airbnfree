import * as types from './userTypes';

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
    const user = {
      type: 'host',
    };
    dispatch(userEvent(types.GET_USER_REQUEST));

    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(userEvent(types.GET_USER_SUCCESS, user));
        resolve(user);
      }, 2000);
    });
  };
}
