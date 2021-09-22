import React, { createContext, useContext, useState } from 'react';
import nextId from 'react-id-generator';

const StoreContext = createContext(null);

export const useStore = () => {
  return useContext(StoreContext);
};

export const InitialNewPillState = {
  label: '',
  type: 'pill',
  groups: [],
  quantity: 0,
  quantityType: 'pill',
  expirationDate: new Date(),
};

const useProvideStore = () => {
  let index = nextId('pill');
  let groupIndex = nextId('group');

  const [pills, setPills] = useState([]);
  const [groups, setGroups] = useState([]);
  const [newPill, setNewPill] = useState(InitialNewPillState);

  const addPill = () => {
    newPill.id = index;
    setPills([...pills, newPill]);
    setNewPill(InitialNewPillState);
  };

  const deletePill = (id) => {
    setPills(pills.filter((p) => p.id !== id));
  };

  const addGroup = (value) => {
    const group = {
      id: groupIndex,
      label: value,
      checked: false,
    };
    setGroups([...groups, group]);
  };

  const deleteGroup = (id) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  return { pills, groups, addPill, deletePill, addGroup, deleteGroup, newPill, setNewPill };
};

// Use it to wrap content with Store
export const ProvideStore = ({ children }) => {
  const store = useProvideStore();
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
