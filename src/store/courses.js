import React, { createContext, useContext, useState } from 'react';
import nextId from 'react-id-generator';
import moment from 'moment';

const CoursesContext = createContext(null);

export const useCourses = () => {
  return useContext(CoursesContext);
};

export const InitialNewCourseState = {
  pill: undefined,
  timers: [
    {
      id: 1,
      time: moment(new Date()).hours(9).minutes(0).toDate(),
      meal: 'any_meal',
    },
  ],
  scheduleType: 'days',
  scheduleDays: null,
  frequency: 'days',
  frequencyNumber: 1,
  dosage: 1,
  dosageEndPeriodType: 'till_date',
  dosageEndPeriodDate: new Date(),
  dosageEndPeriodDurationNumber: 1,
  dosageEndPeriodDurationType: 'duration_days',
  startDate: new Date(),
  durationType: 'date',
  durationEndNumber: 1,
  durationEndType: 'week',
};

const useProvideCoursesStore = () => {
  let index = nextId('course');
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState(InitialNewCourseState);

  const addCourse = () => {
    newCourse.id = index;
    setCourses([...courses, newCourse]);
    setNewCourse(InitialNewCourseState);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (course) => {
    const data = courses.map((c) => (c.id === c.id ? Object.assign({}, c, course) : c));
    setCourses(data);
    setNewCourse(InitialNewCourseState);
  };

  return { courses, addCourse, deleteCourse, updateCourse, newCourse, setNewCourse };
};

// Use it to wrap content with Store
export const ProvideCoursesStore = ({ children }) => {
  const store = useProvideCoursesStore();
  return <CoursesContext.Provider value={store}>{children}</CoursesContext.Provider>;
};
