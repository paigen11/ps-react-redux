// called 'action create' because it creates an action
// all actions MUST have a type property
export function createCourse(course) {
  return { type: 'CREATE_COURSE', course };
}
