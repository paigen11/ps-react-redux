import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import CourseList from './CourseList';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

class CoursesPage extends Component {
  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert(`Loading courses failed ${error}`);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert(`Loading authors failed ${error}`);
      });
    }
  }

  handleDeleteCourse = async course => {
    toast.success('Course deleted');
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error(`Delete failed. ${error.message}`, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

// determines what state is passed to our component via props
function mapStateToProps(state) {
  return {
    // be specific: request only the data your component needs instead of the whole redux store
    courses:
      // check if author data is available or not from the promise
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

// determines which actions are available on props in components
function mapDispatchToProps(dispatch) {
  return {
    // action creators must be called by dispatch
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
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
