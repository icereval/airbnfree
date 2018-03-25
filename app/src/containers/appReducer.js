import { combineReducers } from 'redux';
import user from '../user/userReducer';
import locations from '../locations/locationsReducer';

const appReducer = combineReducers({
  user,
  locations,
});

export default appReducer;
