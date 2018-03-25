import {
  GET_CLIENT_STAYS_SUCCESS,
  GET_HOST_STAYS_SUCCESS,
  GET_CASEMANAGER_STAYS_SUCCESS,
} from './requestTypes';

const initialState = {
  hostStays: [],
  clientStays: [],
  caseManagerStays: [],
};

export default function requests(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENT_STAYS_SUCCESS:
      return Object.assign({}, state, {
        clientStays: action.event,
      });
    case GET_HOST_STAYS_SUCCESS:
      return Object.assign({}, state, {
        hostStays: action.event,
      });
    case GET_CASEMANAGER_STAYS_SUCCESS:
      return Object.assign({}, state, {
        caseManagerStays: action.event,
      });
    default:
      return state;
  }
}
