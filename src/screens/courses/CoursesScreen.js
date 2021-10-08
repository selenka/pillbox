import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
// import SafeAreaView from 'react-native-safe-area-view';
import EmptyMedicinePreview from '../../components/EmptyMedicinePreview';
import { Styles } from '../../utils/styles';

const CoursesScreen = ({ navigation }) => {
  return (
    <View style={s.container}>
      <FAB
        style={Styles.fab}
        icon="alarm-plus"
        onPress={() => {
          navigation.navigate('Courses', { screen: 'CourseItem', params: { mode: 'new' } });
        }}
      />
      <EmptyMedicinePreview
        text="Пусто...У вас пока нет назначеных курсов приема."
        page="courses"
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
});

export default CoursesScreen;
