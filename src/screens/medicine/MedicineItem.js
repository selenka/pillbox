import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { PRIMARY_DARK, PRIMARY_LIGHT } from '../../utils/constants';
import NewPillForm from '../../components/NewPillForm';
import { InitialNewPillState, useStore } from '../../store';

const MedicineItemScreen = ({ navigation }) => {
  const { addPill, newPill, setNewPill } = useStore();

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      setNewPill(InitialNewPillState);
    });
  }, [navigation]);

  return (
    <View style={s.container}>
      <View>
        <NewPillForm />
      </View>
      <Button
          mode="contained"
          style={s.addButton}
          onPress={() => {
            addPill(newPill);
            navigation.goBack();
          }}
          contentStyle={s.buttonContent}
      >
        Добавить
      </Button>
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
    width: '100%',
    height: 80,
    padding: 20,
    backgroundColor: PRIMARY_DARK,
    borderWidth: 1,
    borderColor: PRIMARY_DARK,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: PRIMARY_LIGHT,
  },
  addButton: {
    borderRadius: 0,
  },
  buttonContent: {
    padding: 20,
  },
});

export default MedicineItemScreen;
