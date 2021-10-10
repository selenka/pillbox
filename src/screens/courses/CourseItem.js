import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { PRIMARY_DARK, PRIMARY_LIGHT } from '../../utils/constants';
import NewCourseForm from './components/NewCourseForm';
import { Styles } from '../../utils/styles';
import theme from '../../utils/theme';
import AutocompleteInput from '../../components/AutocompleteInput';
import { useMedicine } from '../../store/medicine';
import { useCourses, InitialNewCourseState } from '../../store/courses';
import { useModal } from '../../store/modal';

const CourseItem = ({ route, navigation }) => {
  const { setFABVisible } = useModal()
  const { pills } = useMedicine();
  const { courses, newCourse, setNewCourse, addCourse, updateCourse } = useCourses();
  const {
    params: { mode, course },
  } = route;

  useEffect(() => {
    setFABVisible(false)
  }, [])

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      setNewCourse(InitialNewCourseState);
      setFABVisible(true)
    });
  }, [navigation]);

  useEffect(() => {
    if (mode === 'edit' && course) {
      setNewCourse(courses.find((c) => c.id === course.id));
    }
  }, [mode, courses]);

  // disable button if no pill is selected
  const disabled = !newCourse.pill;

  return (
    <View style={s.container}>
      <View style={s.mainContainer}>
        {mode === 'edit' ? (
          <TextInput
            mode="flat"
            editable={false}
            value={course.pill.label}
            returnKeyType='done'
            underlineColor="transparent"
            outlineColor="transparent"
            style={Styles.input}
          />
        ) : (
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
        )}
        {newCourse.pill && <NewCourseForm newCourse={newCourse} setNewCourse={setNewCourse} />}
      </View>
      {mode === 'edit' ? (
        <Button
          disabled={disabled}
          mode="contained"
          style={[Styles.accentButton, disabled && Styles.disabledButton]}
          contentStyle={Styles.mainScreenButton}
          labelStyle={{ color: theme.colors.background }}
          onPress={() => {
            updateCourse(newCourse);
            // TODO: should place service call to update pill value and reload pills
            navigation.navigate('Courses', {
              screen: 'ViewCourseScreen',
              params: { name: newCourse.pill.label, course: newCourse },
            });
          }}
        >
          Сохранить
        </Button>
      ) : (
        <Button
          disabled={disabled}
          mode="contained"
          style={[Styles.accentButton, disabled && Styles.disabledButton]}
          labelStyle={{ color: theme.colors.background }}
          contentStyle={Styles.mainScreenButton}
          onPress={() => {
            addCourse(newCourse);
            navigation.goBack();
          }}
        >
          Добавить
        </Button>
      )}
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
