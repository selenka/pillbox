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
  dosageTimesPerDay: 1,
  dosageEndPeriodType: 'till_date',
  dosageEndPeriodDate: new Date(),
  dosageEndPeriodDurationNumber: 1,
  dosageEndPeriodDurationType: 'duration_days',
  startDate: new Date(),
  durationType: 'date',
  durationEndNumber: 1,
  durationEndType: 'week',
  enableMedicineBoxSync: true,
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

  return { courses, addCourse, newCourse, setNewCourse };
};

// Use it to wrap content with Store
export const ProvideCoursesStore = ({ children }) => {
  const store = useProvideCoursesStore();
  return <CoursesContext.Provider value={store}>{children}</CoursesContext.Provider>;
};
