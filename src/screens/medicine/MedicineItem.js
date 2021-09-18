import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { View, Button, StyleSheet } from 'react-native';
import { useStore } from '../../store';
import { PRIMARY_DARK } from '../../utils/constants';
import NewPillForm from '../../components/NewPillForm';

const MedicineItemScreen = ({ navigation }) => {
  const { pillsStore } = useStore();
  const [pill, setPill] = useState({});
  return (
    <View style={s.container}>
      <View>
        <NewPillForm pill={pill} setPill={setPill} />
      </View>
      <Button
        title="Добавить"
        style={s.button}
        color={PRIMARY_DARK}
        onPress={() => {
          pillsStore.addNewPill(pill);
          setPill({});
          navigation.goBack();
        }}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
  },
  form: {
    height: 30,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_DARK,
  },
  button: {
    backgroundColor: PRIMARY_DARK,
  },
});

export default observer(MedicineItemScreen);
