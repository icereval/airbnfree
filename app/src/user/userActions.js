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

    setTimeout(() => {
      dispatch(userEvent(types.GET_USER_SUCCESS, user));
    }, 2000);
  };
}
