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
    const response = {
      away: false,
      description: 'tbd...',
      id: 1,
      name: 'Host 1',
      photo: 'photo...',
      user: {
        active: true,
        email: 'fakehost@test.com',
        firstName: 'Fake',
        id: 2,
        lastName: 'Host',
        photo: 'photo...',
        type: 'host',
      },
    };

    dispatch(userEvent(types.GET_USER_REQUEST));

    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(userEvent(types.GET_USER_SUCCESS, response.user));
        resolve(response.user);
      }, 2000);
    });
  };
}
