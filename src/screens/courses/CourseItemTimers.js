import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Swipeable from 'react-native-swipeable';
import { useCourses } from '../../store/courses';
import { Button, Divider, Subheading } from 'react-native-paper';
import { Styles } from '../../utils/styles';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '../../utils/theme';
import { CANCEL_COLOR } from '../../utils/constants';
import nextId from 'react-id-generator';

let buttonId = nextId('button-timer');

const Timer = ({ index, timer, handleTimerChange }) => {
  return (
    <>
      <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
        <View style={{ padding: 5, justifyContent: 'center' }}>
          <Subheading>{index + 1}.</Subheading>
        </View>
        <View style={[Styles.navigationSelect, { flex: 2 }]}>
          <RNPickerSelect
            placeholder={{}}
            value={timer.meal}
            onValueChange={(value) => handleTimerChange(timer.id, { meal: value })}
            items={[
              { value: 'before_meal', label: 'до еды' },
              { value: 'during_meal', label: 'во время еды' },
              { value: 'after_meal', label: 'после еды' },
              { value: 'any_meal', label: 'не зависит от еды' },
            ]}
            style={{
              inputIOS: Styles.inputPickerSelect,
              viewContainer: { flex: 1, margin: 5 },
            }}
          />
          <Icon
            style={{ marginRight: 10 }}
            name="arrow-right"
            size={20}
            color={theme.colors.accent}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
          <DateTimePicker
            testID="dateTimePicker"
            value={timer.time}
            mode="time"
            onChange={(event, time) => handleTimerChange(timer.id, { time })}
          />
        </View>
      </View>
      <Divider style={s.divider} />
    </>
  );
};

const CourseItemTimers = () => {
  let swipe = useRef(null);
  const { newCourse, setNewCourse } = useCourses();

  const getButtons = (id) => {
    return [
      <Button
        mode="contained"
        key={buttonId}
        style={[s.button, { backgroundColor: CANCEL_COLOR }]}
        labelStyle={{
          fontSize: 10,
          width: 70,
        }}
        onPress={() => {
          handleTimerDelete(id);
          swipe.current.recenter();
        }}
      >
        Удалить
      </Button>,
    ];
  };

  const handleTimerChange = (id, data) => {
    let timers = newCourse.timers.map((t) => ({ ...t }));
    timers = timers.map((t) => (t.id === id ? { ...t, ...data } : t));
    setNewCourse({ ...newCourse, timers });
  };

  const handleTimerDelete = (id) => {
    let timers = newCourse.timers.map((t) => ({ ...t }));
    timers = timers.filter((t) => t.id !== id);
    setNewCourse({ ...newCourse, timers });
  };

  return (
    <View>
      {newCourse.timers.map((timer, index) => (
        <Swipeable ref={swipe} key={`swipe-${timer.id}`} rightButtons={getButtons(timer.id)}>
          <Timer
            key={`timer-${index}`}
            timer={timer}
            index={index}
            handleTimerChange={handleTimerChange}
          />
        </Swipeable>
      ))}
    </View>
  );
};

export default CourseItemTimers;

const s = StyleSheet.create({
  divider: {
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: theme.colors.primary,
  },
  button: {
    alignItems: 'center',
    flex: 1,
    width: 80,
    justifyContent: 'center',
    borderRadius: 0,
  },
});
