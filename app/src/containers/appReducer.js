import { combineReducers } from 'redux';

const initialState = {
  counter: 0,
};

const countTracker = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COUNTER': {
      let count = state.counter;
      const newState = Object.assign({}, state, {
        counter: count += 1,
      });
      return newState;
    }
    case 'REMOVE_COUNTER': {
      let count = state.counter;
      const newState = Object.assign({}, state, {
        counter: count -= 1,
      });
      return newState;
    }
    default:
      return state;
  }
};

// Add multiple reducers here
const appReducer = combineReducers({
  countTracker,
});

export default appReducer;
