import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { PRIMARY_LIGHT } from '../../utils/constants';
import Prompt from '../../components/prompt';
import { useModal } from '../../store/modal';
import { useStore } from '../../store';
import DefaultList from '../../components/list';

const MedicineGroupScreen = () => {
  const { open, setVisible } = useModal();
  const { groups, addGroup } = useStore();
  return (
    <View style={s.container}>
      <View style={{ flex: 2 }}>
        <DefaultList data={groups} />
      </View>
      <Button
        mode="contained"
        style={s.button}
        onPress={() => {
          setVisible(true);
        }}
        contentStyle={s.buttonContent}
      >
        Создать
      </Button>
      <Prompt
        open={open}
        setVisible={setVisible}
        title="Введите название группы:"
        onConfirm={(value) => {
          addGroup(value);
        }}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
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
