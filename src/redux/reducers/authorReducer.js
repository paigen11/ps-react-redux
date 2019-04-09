import * as types from '../actions/actionTypes';

// all reducers expect state and action as their arguments
export default function authorReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state;
  }
}
