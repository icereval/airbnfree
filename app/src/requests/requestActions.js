import * as types from './requestTypes';

const { API_URL } = process.env;

export function requestEvent(type, event) {
  return {
    type,
    event,
  };
}

export function requestEventError(type, error) {
  return {
    type,
    error,
  };
}

export function getClientStays(id) {
  return (dispatch) => {
    dispatch(requestEvent(types.GET_CLIENT_STAYS_REQUEST));

    return fetch(`${API_URL}/clients/${id}/stays`, {
      method: 'GET',
      credentials: 'include',
    }).then(resp => resp.json())
      .then((response) => {
        dispatch(requestEvent(types.GET_CLIENT_STAYS_SUCCESS, response));
        return { response };
      });
  };
}

export function getHostStays(id) {
  return (dispatch) => {
    dispatch(requestEvent(types.GET_HOST_STAYS_REQUEST));

    return fetch(`${API_URL}/hosts/${id}/stays`, {
      method: 'GET',
      credentials: 'include',
    }).then(resp => resp.json())
      .then((response) => {
        dispatch(requestEvent(types.GET_HOST_STAYS_SUCCESS, response));
        return { response };
      });
  };
}

export function getCaseManagerStays(id) {
  return (dispatch) => {
    dispatch(requestEvent(types.GET_CASEMANAGER_STAYS_REQUEST));

    return fetch(`${API_URL}/casemanagers/${id}/stays`, {
      method: 'GET',
      credentials: 'include',
    }).then(resp => resp.json())
      .then((response) => {
        dispatch(requestEvent(types.GET_CASEMANAGER_STAYS_SUCCESS, response));
        return { response };
      });
  };
}
