import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import NewPillForm from './components/NewPillForm';
import { InitialNewPillState, useMedicine } from '../../store/medicine';
import { Styles } from '../../utils/styles';
import theme from '../../utils/theme';
import { useModal } from '../../store/modal';

const MedicineItemScreen = ({ route, navigation }) => {
  const {
    params: { pill, mode },
  } = route;
  const { setFABVisible } = useModal();
  const { pills, addPill, newPill, setNewPill, updatePill } = useMedicine();

  useEffect(() => {
    navigation.addListener('focus', () => {
      setFABVisible(false);
    });
    navigation.addListener('beforeRemove', () => {
      setNewPill(InitialNewPillState);
    });
  }, [navigation]);

  useEffect(() => {
    if (mode === 'edit' && pill) {
      setNewPill(pills.find((p) => p.id === pill.id));
    }
  }, [mode, pills]);

  const isFormValid = () => {
    return newPill.label.length > 0;
  };

  const disabled = !isFormValid();

  return (
    <View style={s.container}>
      <View>
        <NewPillForm newPill={newPill} setNewPill={setNewPill} />
      </View>
      {mode === 'edit' ? (
        <Button
          disabled={disabled}
          mode="contained"
          style={[Styles.accentButton, disabled && Styles.disabledButton]}
          contentStyle={Styles.mainScreenButton}
          labelStyle={{ color: theme.colors.background }}
          onPress={() => {
            updatePill(newPill);
            // TODO: should place service call to update pill value and reload pills
            navigation.navigate('Medicine', {
              screen: 'ViewPillScreen',
              params: { name: newPill.label, pill: newPill },
            });
          }}
        >
          Сохранить
        </Button>
      ) : (
        <Button
          disabled={!isFormValid()}
          mode="contained"
          style={[Styles.accentButton, disabled && Styles.disabledButton]}
          labelStyle={{ color: theme.colors.background }}
          contentStyle={Styles.mainScreenButton}
          onPress={() => {
            addPill(newPill);
            navigation.goBack();
          }}
        >
          Добавить
        </Button>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 25,
  },
});

export default MedicineItemScreen;
