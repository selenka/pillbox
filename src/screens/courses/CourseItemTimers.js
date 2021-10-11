import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useCourses } from '../../store/courses';
import { Subheading } from 'react-native-paper';
import { Styles } from '../../utils/styles';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '../../utils/theme';
import { SwipeHiddenItem, SwipeItem } from '../../components/list/Swipe';
import { SwipeListView } from 'react-native-swipe-list-view';

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
    </>
  );
};

const CourseItemTimers = () => {
  const { newCourse, setNewCourse } = useCourses();

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

  const list = useMemo(() => {
    return newCourse.timers.map((item, i) => ({ ...item, key: `${i}` }));
  }, [newCourse.timers]);

  return (
    <View>
      <SwipeListView
        disableRightSwipe
        data={list}
        renderItem={({ item, index }) => {
          return (
            <SwipeItem key={item.key} itemKey={item.key}>
              <Timer
                key={`timer-${item.key}`}
                timer={item}
                index={index}
                handleTimerChange={handleTimerChange}
              />
            </SwipeItem>
          );
        }}
        renderHiddenItem={({ item }, rowMap) => {
          return (
            <SwipeHiddenItem
              item={item}
              rowMap={rowMap}
              onLeftSwipeRightButton={(id) => handleTimerDelete(id)}
            />
          );
        }}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
    </View>
  );
};

export default CourseItemTimers;
