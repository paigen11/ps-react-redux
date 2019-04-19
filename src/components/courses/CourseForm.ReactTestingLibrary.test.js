import React from 'react';
import { cleanup, render } from 'react-testing-library';
import CourseForm from './CourseForm';
import { debug } from 'util';

afterEach(cleanup);

function renderCourseForm(args) {
  let defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };

  const props = { ...defaultProps, ...args };
  // this is the same as shallow for jest / enzyme
  // there's no shallow rendering here, component always mount
  return render(<CourseForm {...props} />);
}

it('should render Add Course header', () => {
  const { getByText } = renderCourseForm();
  // don't have to explicitly call expect either, by making an assertion,
  // the expect is automatic
  getByText('Add Course');
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderCourseForm();
  getByText('Save');
});

it('should label save button as "Saving..." when saving', () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText('Saving...');
});
