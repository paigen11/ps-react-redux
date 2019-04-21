import { createStore } from 'redux';
import rootReducer from './reducers';
import initialState from './reducers/initialState';
import * as courseActions from './actions/courseActions';

// preferred way to test stores becuase a lot of surface area covered without a whole lot of code
test('should handle creating courses and updating courses', function() {
  // arrange
  const store = createStore(rootReducer, initialState);
  const courses = [
    {
      id: 1,
      title: 'Clean Code',
    },
    {
      id: 2,
      title: 'Test Two',
    },
  ];

  const course = {
    id: 2,
    title: 'Cleaner Code',
  };

  // act
  const action = courseActions.createCourseSuccess(courses[0]);
  store.dispatch(action);

  const action2 = courseActions.createCourseSuccess(courses[1]);
  store.dispatch(action2);

  // assert
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(courses[0]);
  const secondCreateCourse = store.getState().courses[1];
  expect(secondCreateCourse).toEqual(courses[1]);

  // update course
  const action3 = courseActions.updateCourseSuccess(course);
  store.dispatch(action3);

  const updatedCourse = store.getState().courses.find(a => a.id === course.id);
  const untouchedCourse = store
    .getState()
    .courses.find(a => a.id !== course.id);

  // more assertions
  expect(updatedCourse.title).toEqual('Cleaner Code');
  expect(untouchedCourse.title).toEqual('Clean Code');
  expect(store.getState().courses.length).toEqual(2);
});
