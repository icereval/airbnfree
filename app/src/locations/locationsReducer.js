import {
  GET_LOCATIONS_REQUEST,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_FAILURE,
} from './locationsTypes';

const initialState = {
  loading: false,
  loaded: [],
  error: {},
};

export default function locations(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case GET_LOCATIONS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loaded: action.event,
      });
    case GET_LOCATIONS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });
    default:
      return state;
  }
}
