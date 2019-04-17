import React from 'react';
import CourseForm from './CourseForm';
// shallow renders single components
// mount renders components with children
import { shallow } from 'enzyme';

// this factory function avoids having to repeat rendering the form for each test
function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };

  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

it('renders form and header', () => {
  const wrapper = renderCourseForm();
  // console.log(wrapper.debug());
  expect(wrapper.find('form').length).toBe(1);
  expect(wrapper.find('h2').text()).toEqual('Add Course');
});

it('labels save buttons as "Save" when not saving', () => {
  const wrapper = renderCourseForm();
  expect(wrapper.find('button').text()).toBe('Save');
});

it('labels save buttons as "Saving..." when not saving', () => {
  const wrapper = renderCourseForm({ saving: true });
  expect(wrapper.find('button').text()).toBe('Saving...');
});
