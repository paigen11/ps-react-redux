import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as courseActions from '../../redux/actions/courseActions';

class CoursesPage extends Component {
  state = {
    course: {
      title: '',
    },
  };

  handleChange = e => {
    const course = { ...this.state.course, title: e.target.value };
    this.setState({ course });
  };

  handleSubmit = e => {
    e.preventDefault();
    /* you must dispatch an action for it to work, 
    but don't need to wrap it in a dispatch b/c handled in mapDispatchToProps function */
    this.props.createCourse(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  createCourse: PropTypes.func.isRequired,
};

// determines what state is passed to our component via props
function mapStateToProps(state) {
  return {
    // be specific: request only the data your component needs instead of the whole redux store
    courses: state.courses,
  };
}

// determines which actions are available on props in components
function mapDispatchToProps(dispatch) {
  return {
    // action creators must be called by dispatch
    createCourse: course => dispatch(courseActions.createCourse(course)),
  };
}

/* the connect function returns a function,
 and that function calls our component (HOC style) */

/* since mapDispatchToProps is not explicitly called, 
connect automatically adds dispatch as a prop  on our component*/
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoursesPage);
