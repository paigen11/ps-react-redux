import * as types from '../actions/actionTypes';
import initialState from './initialState';

// all reducers expect state and action as their arguments
export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      // state.push(action.course); // don't do this it mutates state
      return [...state, { ...action.course }];
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}
