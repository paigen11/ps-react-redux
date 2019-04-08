import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../redux/actions/courseActions';

class CoursesPage extends Component {
  componentDidMount() {
    this.props.actions.loadCourses().catch(error => {
      alert(`Loading courses failed ${error}`);
    });
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
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
    actions: bindActionCreators(courseActions, dispatch),
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
