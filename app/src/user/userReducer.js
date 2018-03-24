import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from './userTypes';

const initialState = {
  loading: false,
  loaded: {},
  error: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loaded: action.event,
      });
    case GET_USER_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });
    default:
      return state;
  }
}
