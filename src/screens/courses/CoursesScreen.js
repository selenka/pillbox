import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, FAB } from 'react-native-paper';
import EmptyMedicinePreview from '../../components/EmptyMedicinePreview';

const CoursesScreen = ({ navigation }) => {
  return (
    <View style={s.container}>
      <FAB
        style={s.fab}
        icon="alarm-plus"
        onPress={() => {
          navigation.navigate('CourseItem', { mode: 'new' });
        }}
      />
      <EmptyMedicinePreview
        text="Пусто...У вас пока нет назначеных курсов приема. Наш диагноз - Вы здоровы! Но все-таки не забывайте надевать маску в общественных местах"
        page="courses"
      />
    </View>
  );
};

const s = StyleSheet.create({
  fab: {
    position: 'absolute',
    zIndex: 100,
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    position: 'relative',
    height: '100%',
  },
});

export default CoursesScreen;
