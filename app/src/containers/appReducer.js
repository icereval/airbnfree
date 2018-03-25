import { combineReducers } from 'redux';
import user from '../user/userReducer';
import locations from '../locations/locationsReducer';
import requests from '../requests/requestReducer';

const appReducer = combineReducers({
  user,
  locations,
  requests,
});

export default appReducer;
