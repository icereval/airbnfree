const { API_URL } = process.env;

export function authEvent(type, event) {
  return {
    type,
    event,
  };
}

export function authEventError(type, error) {
  return {
    type,
    error,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(authEvent('LOGIN_REQUEST'));

    return fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(resp => resp.json())
      .then((response) => {
        const { error } = response;

        if (error) {
          dispatch(authEventError('LOGIN_REQUEST_FAILED', error));
          return { error };
        }
        dispatch(authEvent('LOGIN_REQUEST_SUCCESS', response));
        return { response };
      });
  };
}

export function signup(event) {
  return (dispatch) => {
    dispatch(authEvent('SIGNUP_REQUEST'));

    return fetch(`${API_URL}/signup`, {
      method: 'PUT',
      body: JSON.stringify(event),
      credentials: 'include',
    }).then(resp => resp.json())
      .then((response) => {
        const { error } = response;
        if (error) {
          dispatch(authEventError('SIGNUP_REQUEST_FAILED', error));
          return { error };
        }
        dispatch(authEvent('SIGNUP_REQUEST_SUCCESS', response));
        return { response };
      });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(authEvent('LOGOUT_REQUEST'));

    return fetch(`${API_URL}/logout`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(resp => resp.json())
      .then((response) => {
        const { error } = response;

        if (error) {
          dispatch(authEventError('LOGOUT_REQUEST_FAILURE', error));
          return { error };
        }
        dispatch(authEvent('LOGOUT_REQUEST_SUCCESS', response));
        return { response };
      });
  };
}
