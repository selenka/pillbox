import React, { useEffect, useState } from 'react';
import { Snackbar } from 'react-native-paper';
import { useModal } from '../store/modal';

const Notification = () => {
  const { notify } = useModal();
  const [open, setOpen] = useState(false);
  const onDismissSnackBar = () => setOpen(false);

  useEffect(() => {
    setOpen(notify.open);
  }, [notify]);

  return (
    <Snackbar
      visible={open}
      onDismiss={onDismissSnackBar}
      action={{
        label: 'OK',
        onPress: () => {
          onDismissSnackBar();
        },
      }}
    >
      {notify.text}
    </Snackbar>
  );
};

export default Notification;
