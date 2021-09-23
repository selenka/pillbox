import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { PRIMARY_DARK, PRIMARY_LIGHT } from '../../utils/constants';

// название лекарства ( из списка аптечки )
// дозировка
// дни приема mon - sun
// время приема и напоминание
// repeat - once/daily/weekdays/weekly/montly/ yearly
// последний день приема или курс 2табл в сутки 14 дней.
// switch  - автоматически удалять таблетки из курса в аптечке

const CourseItem = ({ route, navigation }) => {
  const {
    params: { mode },
  } = route;

  return (
    <View style={s.container}>
      <View></View>
      <Button
        mode="contained"
        style={s.addButton}
        onPress={() => {
          navigation.goBack();
        }}
        contentStyle={s.buttonContent}
      >
        Добавить
      </Button>
    </View>
  );
};
export default CourseItem;

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
