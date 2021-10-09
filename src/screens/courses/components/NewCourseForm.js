import React from 'react';
import moment from 'moment';
import { TouchableOpacity, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import {
  ACCENT_COLOR,
  days,
  dosagePeriodDuration,
  frequency,
  INPUT_TEXT_COLOR,
  pillsQuantity,
} from '../../../utils/constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonGroup from '../../../components/ButtonGroup';
import theme from '../../../utils/theme';
import InputSpinner from 'react-native-input-spinner';
import RNPickerSelect from 'react-native-picker-select';
import { getQuantityTypeLabel } from '../../../utils/helpers';
import { useCourses } from '../../../store/courses';
import { Styles } from '../../../utils/styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';

const NewCourseForm = () => {
  const navigation = useNavigation();
  const { newCourse, setNewCourse } = useCourses();

  // console.log('newCourse', newCourse);

  return (
    <View>
      <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
        <View style={{ marginRight: 10, justifyContent: 'center' }}>
          <Text>Принимать по</Text>
        </View>
        <InputSpinner
          width={150}
          type="decimal"
          colorLeft={theme.colors.accent}
          colorRight={theme.colors.accent}
          returnKeyType="next"
          step={0.25}
          value={newCourse.dosage}
          onChange={(num) => {
            setNewCourse({ ...newCourse, dosage: num });
          }}
        />
        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
          <Text>{newCourse.pill && getQuantityTypeLabel(newCourse.pill)}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ }}>{newCourse.timers.length}</Text>
        <Text style={{ paddingLeft: 5 }}>раз(а) в сутки:</Text>
      </View>
      <TouchableOpacity
        style={[Styles.navigationSelect, { paddingHorizontal: 10, marginTop: 10 }]}
        onPress={() => navigation.navigate('CourseItemTimers')}
      >
        {newCourse.timers.length ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 5 }}>
            {newCourse.timers.map((t) => (
              <Chip mode="outlined" key={`timer-tag-${t.id}`}>
                {moment(t.time).format('LT')}
              </Chip>
            ))}
          </View>
        ) : (
          <Text style={{ color: INPUT_TEXT_COLOR }}>Выберите время</Text>
        )}
        <Icon name="arrow-right" size={20} color={ACCENT_COLOR} />
      </TouchableOpacity>
      <View style={{ marginTop: 20 }}>
        <View>
          <ButtonGroup
            stretchButtons
            defaultSelection="days"
            onButtonToggle={(item) => {
              setNewCourse({
                ...newCourse,
                scheduleType: item,
              });
            }}
            buttons={[
              { value: 'days', label: 'Дни' },
              { value: 'intervals', label: 'Интервалы' },
            ]}
          />
        </View>
        {newCourse.scheduleType === 'days' ? (
          <View style={{ marginVertical: 20 }}>
            <ButtonGroup
              multiple
              defaultSelection={['monday']}
              buttons={days}
              onButtonToggle={(item) => {
                setNewCourse({
                  ...newCourse,
                  scheduleDays: item,
                });
              }}
            />
          </View>
        ) : (
          <View style={{ paddingVertical: 15 }}>
            <Text>Повторять каждые</Text>
            <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
              <InputSpinner
                width={150}
                type="decimal"
                colorLeft={theme.colors.accent}
                colorRight={theme.colors.accent}
                returnKeyType="next"
                step={1}
                min={1}
                value={newCourse.frequencyNumber}
                onChange={(num) => {
                  setNewCourse({ ...newCourse, frequencyNumber: num });
                }}
              />
              <View style={[Styles.navigationSelect, { flex: 1, marginLeft: 10 }]}>
                <RNPickerSelect
                  placeholder={{}}
                  value={newCourse.frequency}
                  onValueChange={(value) => setNewCourse({ ...newCourse, frequency: value })}
                  items={frequency}
                  style={{
                    inputIOS: Styles.inputPickerSelect,
                    viewContainer: { flex: 1, margin: 5 },
                  }}
                />
                <Icon
                  style={{ marginRight: 10 }}
                  name="arrow-right"
                  size={20}
                  color={ACCENT_COLOR}
                />
              </View>
            </View>
          </View>
        )}
        <View style={{ marginVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ paddingRight: 20 }}>Начиная с</Text>
          <View style={{ flex: 1 }}>
            <DateTimePicker
              testID="dateTimePicker"
              minimumDate={new Date()}
              value={newCourse.startDate || new Date()}
              mode="date"
              onChange={(event, date) => setNewCourse({ ...newCourse, startDate: date })}
            />
          </View>
        </View>
      </View>
      <ButtonGroup
        stretchButtons
        defaultSelection="till_date"
        buttons={[
          { value: 'till_date', label: 'До даты' },
          { value: 'during_period', label: 'Длительность' },
        ]}
        onButtonToggle={(item) => {
          console.log('item', item);
          setNewCourse({
            ...newCourse,
            dosageEndPeriodType: item,
          });
        }}
      />
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {newCourse.dosageEndPeriodType === 'till_date' ? (
            <DateTimePicker
              testID="dateTimePicker"
              minimumDate={moment().add(1, 'days').toDate()}
              value={newCourse.dosageEndPeriodDate || moment().add(1, 'days').toDate()}
              mode="date"
              onChange={(event, date) => setNewCourse({ ...newCourse, dosageEndPeriodDate: date })}
            />
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <View style={[Styles.navigationSelect, { flex: 1 }]}>
                <RNPickerSelect
                  placeholder={{}}
                  value={newCourse.dosageEndPeriodDurationNumber}
                  onValueChange={(value) =>
                    setNewCourse({ ...newCourse, dosageEndPeriodDurationNumber: value })
                  }
                  items={pillsQuantity}
                  min={1}
                  style={{
                    inputIOS: Styles.inputPickerSelect,
                    viewContainer: { flex: 1, margin: 5 },
                  }}
                />
                <Icon
                  style={{ marginRight: 10 }}
                  name="arrow-right"
                  size={20}
                  color={ACCENT_COLOR}
                />
              </View>
              <View style={[Styles.navigationSelect, { flex: 1, marginLeft: 10 }]}>
                <RNPickerSelect
                  placeholder={{}}
                  value={newCourse.dosageEndPeriodDurationType}
                  onValueChange={(value) =>
                    setNewCourse({ ...newCourse, dosageEndPeriodDurationType: value })
                  }
                  items={dosagePeriodDuration}
                  style={{
                    inputIOS: Styles.inputPickerSelect,
                    viewContainer: { flex: 1, margin: 5 },
                  }}
                />
                <Icon
                  style={{ marginRight: 10 }}
                  name="arrow-right"
                  size={20}
                  color={ACCENT_COLOR}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default NewCourseForm;
