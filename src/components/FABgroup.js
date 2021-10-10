import * as React from 'react';
import { FAB, Portal } from 'react-native-paper';
import { useMedicine } from '../store/medicine';
import { useModal } from '../store/modal';

const FABgroup = ({ appRef }) => {
  const navigation = appRef.current;
  const { pills } = useMedicine();
  const { setNotification } = useModal();

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        style={{ paddingBottom: 100 }}
        open={open}
        icon={open ? 'close' : 'plus'}
        actions={[
          {
            icon: 'alarm-plus',
            label: 'Добавить расписание',
            onPress: () => {
              if (pills.length) {
                navigation.navigate('Courses', { screen: 'CourseItem', params: { mode: 'new' } });
              } else {
                setNotification({
                  open: true,
                  text: 'Ваша аптечка пустая',
                });
              }
            },
          },
          {
            icon: 'flask-empty-plus-outline',
            label: 'Добавить лекарство в аптечку',
            onPress: () => {
              navigation.navigate('Medicine', { screen: 'MedicineItem', params: { mode: 'new' } });
            },
          },
          {
            icon: 'pill',
            label: 'Принять лекарство не по расписанию',
            onPress: () => alert('Таблетка из аптечки'),
            small: false,
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};

export default FABgroup;
