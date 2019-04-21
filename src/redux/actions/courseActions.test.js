import * as courseActions from './courseActions';
import * as types from './actionTypes';
import { courses } from '../../../tools/mockData';

describe('createCourseSuccess', () => {
  // this test confirms when the createCourseSuccess action creator
  // is called, I get the expected object shape back
  it('should create a CREATE_COURSE_SUCCESS action', () => {
    // arrange
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course,
    };

    // act
    const action = courseActions.createCourseSuccess(course);

    // assert
    expect(action).toEqual(expectedAction);
  });
});
