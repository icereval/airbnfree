import { combineReducers } from 'redux';
import user from '../user/userReducer';

const appReducer = combineReducers({
  user,
});

export default appReducer;
