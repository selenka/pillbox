import React, { createContext, useContext, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { getMedicine, getMedicineGroups } from '../api';

const StoreContext = createContext(null);

export const useMedicine = () => {
  return useContext(StoreContext);
};

export const InitialNewPillState = {
  label: '',
  type: 'pill',
  groups: [],
  quantity: 1, // min
  quantityType: 'pill',
  expirationDate: new Date(),
};

const useProvideStore = () => {
  let index = nextId('pill');
  let groupIndex = nextId('group');

  const [pills, setPills] = useState([]);
  const [groups, setGroups] = useState([]);
  const [newPill, setNewPill] = useState(InitialNewPillState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([getMedicine(), getMedicineGroups()])
      .then(([medicine, medicineGroups]) => {
        setMedicine(medicine.data, medicineGroups.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const setMedicine = (medicine, groups) => {
    setPills(medicine);
    setGroups(groups);
  };

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

  return {
    pills,
    groups,
    setMedicine,
    addPill,
    deletePill,
    addGroup,
    deleteGroup,
    newPill,
    setNewPill,
    updatePill,
    updateGroup,
    loading,
  };
};

// Use it to wrap content with Store
export const ProvideStore = ({ children }) => {
  const store = useProvideStore();
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
