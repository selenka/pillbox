import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { PRIMARY_DARK, PRIMARY_LIGHT } from '../../utils/constants';
import NewCourseForm from '../../components/NewCourseForm';
import { Styles } from '../../utils/styles';
import theme from '../../utils/theme';
import AutocompleteInput from '../../components/AutocompleteInput';
import { useStore } from '../../store';
import { useCourses } from '../../store/courses';

const CourseItem = ({ route, navigation }) => {
  const { pills } = useStore();
  const { newCourse, setNewCourse } = useCourses();
  const {
    params: { mode },
  } = route;

  console.log('CourseItem mode', mode);

  return (
    <View style={s.container}>
      <View style={s.mainContainer}>
        <AutocompleteInput
          data={pills}
          placeholder="Выберите лекарство из списка"
          setSelectedItem={(item) =>
            setNewCourse({
              ...newCourse,
              pill: item,
            })
          }
        />
        {newCourse.pill && <NewCourseForm />}
      </View>
      <Button
        mode="contained"
        style={[
          Styles.accentButton,
          // disabled && Styles.disabledButton
        ]}
        labelStyle={{ color: theme.colors.background }}
        contentStyle={Styles.mainScreenButton}
        onPress={() => {
          // addPill(newPill);
          navigation.goBack();
        }}
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
    paddingBottom: 25,
  },
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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
