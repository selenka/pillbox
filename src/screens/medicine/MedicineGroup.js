import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { PRIMARY_LIGHT } from '../../utils/constants';
import Prompt from '../../components/modals/prompt';
import { useModal } from '../../store/modal';
import { useMedicine } from '../../store/medicine';
import DefaultList from '../../components/list';
import { Styles } from '../../utils/styles';
import theme from '../../utils/theme';

const MedicineGroupScreen = ({ navigation }) => {
  const { open, setVisible, setFABVisible } = useModal();
  const { groups, addGroup, updateGroup, deleteGroup } = useMedicine();

  const [mode, setMode] = useState('view');
  const [editGroup, setEditGroup] = useState(undefined);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setFABVisible(false);
    });
  }, [navigation]);

  const onEditGroup = (id) => {
    setEditGroup(id);
    setMode('edit');
    setVisible(true);
  };

  const onDeleteGroup = (id) => {
    deleteGroup(id);
  };
  return (
    <View style={s.container}>
      <View style={{ flex: 2 }}>
        <DefaultList
          data={groups}
          onEditPress={(id) => onEditGroup(id)}
          onDeletePress={(id) => onDeleteGroup(id)}
        />
      </View>
      <Button
        mode="contained"
        style={Styles.accentButton}
        onPress={() => {
          setVisible(true);
        }}
        contentStyle={Styles.mainScreenButton}
        labelStyle={{ color: theme.colors.background }}
      >
        Создать
      </Button>
      <Prompt
        mode={mode}
        open={open}
        value={editGroup ? groups.find((g) => g.id === editGroup).label : ''}
        setVisible={setVisible}
        title="Введите название группы:"
        onConfirm={(value) => {
          editGroup ? updateGroup(editGroup, value) : addGroup(value);
          setEditGroup(undefined);
        }}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 25,
  },
  button: {
    borderRadius: 0,
  },
  buttonContent: {
    padding: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: PRIMARY_LIGHT,
  },
});

export default MedicineGroupScreen;
