import React from 'react';
import PillsStore from './PillsStore';
import CoursesStore from './CoursesStore';

export const stores = {
  pillsStore: PillsStore,
  courseStore: CoursesStore,
};

export const StoreContext = React.createContext(stores);

export const useStore = () => React.useContext(StoreContext);
