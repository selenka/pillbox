import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export const useModal = () => {
  return useContext(ModalContext);
};

const useProvideModalStore = () => {
  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState({ open: false, text: '' });
  const [fab, setFab] = useState(true);

  const setVisible = (value) => {
    setOpen(value);
  };

  const setNotification = (value) => {
    setNotify(value);
  };

  const setFABVisible = (value) => {
    setFab(value);
  };

  return { open, notify, fab, setNotification, setFABVisible, setVisible };
};

// Use it to wrap content with Store
export const ProvideModalStore = ({ children }) => {
  const store = useProvideModalStore();
  return <ModalContext.Provider value={store}>{children}</ModalContext.Provider>;
};
