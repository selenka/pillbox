import React from 'react';
// import moment from 'moment';
import { View, StyleSheet } from 'react-native';
import { Button, List, Chip } from 'react-native-paper';
import {  PRIMARY_DARK, PRIMARY_LIGHT } from '../../utils/constants';
import { Styles } from '../../utils/styles';
import theme from '../../utils/theme';
import { getQuantityTypeLabel } from '../../utils/helpers';
import moment from 'moment';
import { useCourses } from '../../store/courses';

const ViewPillScreen = ({ route, navigation }) => {
  const {
    params: { course },
  } = route;
  const { deleteCourse } = useCourses();

  return (
    <View style={s.container}>
      <View>
        <List.Item title="Дозировка" description={`${course.dosage} ${getQuantityTypeLabel(course.pill)}`} />
        <List.Item title="Напоминания" description={!course.timers.length && '---'} />
        <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
          {course.timers.map((t) => (
            <Chip mode="outlined" key={`view-pill-tag-${t.id}`}>
              {moment(t.time).format('LT')}{' '}
            </Chip>
          ))}
        </View>
        <List.Item
          title="Расписание"
          description={
            course.scheduleType === 'days'
              ? ''
              : `${course.frequencyNumber} ${course.frequency}`
          }
        />
        {
          course.scheduleDays &&
          <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
            {course.scheduleDays.map((day) => (
              <Chip mode="outlined" key={`view-day-tag-${day}`}>
                {day}{' '}
              </Chip>
            ))}
          </View>
        }
        <List.Item title="Начало приема" description={moment(course.startDate).format('DD-MM-YYYY')} />
        <List.Item
          title="Длительность"
          description={
            course.dosageEndPeriodType === 'till_date'
              ? moment(course.dosageEndPeriodDate).format('DD-MM-YYYY')
              : `${course.dosageEndPeriodDurationNumber} ${course.dosageEndPeriodDurationType}`
          }
        />
      </View>
      <Button
        mode="contained"
        style={Styles.cancelButton}
        onPress={() => {
          deleteCourse(course.id);
          navigation.goBack();
        }}
        contentStyle={Styles.mainScreenButton}
        labelStyle={{ color: theme.colors.background }}
      >
        Удалить
      </Button>
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

export default ViewPillScreen;
