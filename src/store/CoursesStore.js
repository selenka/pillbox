import { makeObservable, observable, action } from 'mobx';

class CoursesStore {
  courses = [];
  constructor() {
    makeObservable(this, {
      courses: observable,
      addNewCourse: action,
    });
  }

  addNewCourse(course = {}) {
    console.log(' action addNewCourse', course);
    this.courses.push(course);
  }
}

export default new CoursesStore();
