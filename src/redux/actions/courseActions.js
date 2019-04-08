import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';

// called 'action create' because it creates an action
// all actions MUST have a type property
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}

export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function loadCourses() {
  // redux thunk injects dispatch so we don't have to
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}
