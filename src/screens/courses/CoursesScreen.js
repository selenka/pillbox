import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Divider, FAB, List } from 'react-native-paper';
// import SafeAreaView from 'react-native-safe-area-view';
import EmptyMedicinePreview from '../../components/EmptyMedicinePreview';
import { Styles } from '../../utils/styles';
import { useCourses } from '../../store/courses';
import theme from '../../utils/theme';
import { pillQuantityTypes } from '../../utils/constants';
import { getQuantityTypeLabel } from '../../utils/helpers';

const CoursesScreen = ({ navigation }) => {
  const { courses } = useCourses()

  const onListItemPress = (item) => {
    navigation.navigate('Courses', {
      screen: 'ViewCourseScreen',
      params: { name: item.pill.label, course: item },
    });
  };

  return (
    <View style={s.container}>
      <FAB
        style={Styles.fab}
        icon="alarm-plus"
        onPress={() => {
          navigation.navigate('Courses', { screen: 'CourseItem', params: { mode: 'new' } });
        }}
      />
      {courses.length ? (
        <List.Section>
          {courses.map((course) => {
            const quantityType = getQuantityTypeLabel(course.pill);
            return (
              <Pressable
                key={`pressable-courses-${course.id}`}
                onPress={() => onListItemPress(course)}
              >
                <List.Item
                  style={s.item}
                  key={`courses-${course.id}`}
                  title={course.pill.label}
                  description={`${course.dosage} ${quantityType} ${course.timers.length} раз(-а) в сутки`}
                />
                <Divider key={`divider-${course.id}`} style={s.divider} />
              </Pressable>
            )})}
        </List.Section>
      ) : (
        <EmptyMedicinePreview
          text="Пусто...У вас пока нет назначеных курсов приема."
          page="courses"
        />
      )}
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  item: {
    borderLeftWidth: 10,
    borderLeftColor: theme.colors.primary,
  },
});

export default CoursesScreen;
