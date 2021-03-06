import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import { bindActionCreators } from 'redux';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

// this allows for testing the unconnected component without redux
export function ManageCoursePage({
  courses,
  authors,
  actions,
  history,
  // assigns any objects not explicitly declared to a catch all object called props
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert(`Loading courses failed ${error}`);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert(`Loading authors failed ${error}`);
      });
    }
    // having this empty array as a second argument
    // means the effect will run once when the component mounts
  }, [props.course]);

  function handleChange(e) {
    const { name, value } = e.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = 'Title is required.';
    if (!authorId) errors.author = 'Author is required.';
    if (!category) errors.category = 'Category is required.';

    setErrors(errors);
    // form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(e) {
    e.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    actions
      .saveCourse(course)
      .then(() => {
        toast.success('Course Saved');
        history.push('/courses');
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug);
}

// ownProps lets us access the component's props
// (so we can read URL data injected on props by React Router)
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      saveCourse: bindActionCreators(courseActions.saveCourse, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageCoursePage);
