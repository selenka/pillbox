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

  const updatePill = (pill) => {
    const data = pills.map((p) => (p.id === pill.id ? Object.assign({}, p, pill) : p));
    setPills(data);
    setNewPill(InitialNewPillState);
  };

  const addGroup = (value) => {
    const group = {
      id: groupIndex,
      label: value,
      checked: false,
    };
    setGroups([...groups, group]);
  };

  const updateGroup = (id, value) => {
    const item = groups.find((g) => g.id === id);
    const data = groups.map((g) => (g.id === item.id ? Object.assign({}, g, { label: value }) : g));
    setGroups(data);
  };

  const deleteGroup = (id) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  console.log('groups', groups);

  return {
    pills,
    groups,
    addPill,
    deletePill,
    addGroup,
    deleteGroup,
    newPill,
    setNewPill,
    updatePill,
    updateGroup,
  };
};

// Use it to wrap content with Store
export const ProvideStore = ({ children }) => {
  const store = useProvideStore();
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
