import React from 'react';
import moment from 'moment';
import { StyleSheet, View } from 'react-native';
import { RadioButton, Text, Switch } from 'react-native-paper';
import {
  days,
  dosagePeriodDuration,
  frequency,
  pillsFractionsQuantity,
  pillsQuantity,
  PRIMARY_DARK,
} from '../utils/constants';
import AutocompleteInput from './AutocompleteInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useStore } from '../store';
import ButtonGroup from './ButtonGroup';
import theme from '../utils/theme';
import InputSpinner from 'react-native-input-spinner';
import RNPickerSelect from 'react-native-picker-select';
import { getQuantityTypeLabel } from '../utils/helpers';
import { useCourses } from '../store/courses';

const NewCourseForm = () => {
  const { newCourse, setNewCourse } = useCourses();

  const { pills } = useStore();

  console.log('newCourse', newCourse);

  return (
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
      <Text style={{ paddingTop: 20 }}>Принимать по</Text>
      <View style={{ flexDirection: 'row' }}>
        <RNPickerSelect
          placeholder={{}}
          value={newCourse.dosage}
          onValueChange={(value) => setNewCourse({ ...newCourse, dosage: value })}
          items={pillsQuantity}
          style={{
            inputIOS: s.inputSelect,
            viewContainer: { flex: 1, paddingTop: 11 },
          }}
        />
        <RNPickerSelect
          placeholder={{}}
          value={newCourse.dosageFraction}
          onValueChange={(value) => setNewCourse({ ...newCourse, dosageFraction: value })}
          items={pillsFractionsQuantity}
          style={{
            inputIOS: s.inputSelect,
            viewContainer: { flex: 1, paddingTop: 11 },
          }}
        />
        <View style={{ flex: 1 }}>
          <Text>{newCourse.pill && getQuantityTypeLabel(newCourse.pill)}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <RNPickerSelect
          placeholder={{}}
          value={newCourse.dosageTimesPerDay}
          onValueChange={(value) => setNewCourse({ ...newCourse, dosageTimesPerDay: value })}
          items={pillsQuantity}
          style={{
            inputIOS: s.inputSelect,
            viewContainer: { flex: 1, paddingTop: 11 },
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ paddingTop: 20, paddingLeft: 10 }}>раз(а) в сутки</Text>
        </View>
        <View style={{ flex: 1 }} />
      </View>

      <View style={{ marginTop: 20 }}>
        <View>
          <ButtonGroup
            stretchButtons
            defaultSelection="days"
            onButtonToggle={(item) =>
              setNewCourse({
                ...newCourse,
                scheduleType: item.value,
              })
            }
            buttons={[
              { value: 'days', label: 'Дни' },
              { value: 'intervals', label: 'Интервалы' },
            ]}
          />
        </View>
        {newCourse.scheduleType === 'days' ? (
          <View style={{ marginVertical: 20 }}>
            <ButtonGroup multiple defaultSelection={['monday']} buttons={days} />
          </View>
        ) : (
          <View>
            <View style={{ marginVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
              <Text>Повторять каждые</Text>
              <InputSpinner
                width={150}
                rounded={false}
                showBorder={false}
                background={'transparent'}
                textColor={theme.colors.primary}
                style={{
                  flex: 1,
                  marginLeft: 10,
                  shadowColor: '#fff',
                  borderBottomWidth: 1,
                }}
                colorLeft={'transparent'}
                colorRight={'transparent'}
                buttonTextColor={theme.colors.primary}
                colorPress={theme.colors.accent}
                returnKeyType="next"
                step={1}
                min={1}
                value={newCourse.frequencyNumber}
                onChange={(num) => {
                  setNewCourse({ ...newCourse, frequencyNumber: num });
                }}
              />
            </View>
            <ButtonGroup stretchButtons defaultSelection="days" buttons={frequency} fontSize={12} />
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
      <View style={{ flexDirection: 'row' }}>
        <RadioButton.Group
          style={{ flex: 1 }}
          value={newCourse.dosageEndPeriodType}
          onValueChange={(value) =>
            setNewCourse({
              ...newCourse,
              dosageEndPeriodType: value,
            })
          }
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton value="till_date" />
            <Text>До даты</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton value="during_period" />
            <Text>Длительность</Text>
          </View>
        </RadioButton.Group>
        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 20 }}>
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
              <RNPickerSelect
                placeholder={{}}
                value={newCourse.dosageEndPeriodDurationNumber}
                onValueChange={(value) =>
                  setNewCourse({ ...newCourse, dosageEndPeriodDurationNumber: value })
                }
                items={pillsQuantity}
                style={{
                  inputIOS: s.inputSelect,
                  viewContainer: { flex: 1, paddingTop: 11 },
                }}
              />
              <RNPickerSelect
                placeholder={{}}
                value={newCourse.dosageEndPeriodDurationType}
                onValueChange={(value) =>
                  setNewCourse({ ...newCourse, dosageEndPeriodDurationType: value })
                }
                items={dosagePeriodDuration}
                style={{
                  inputIOS: s.inputSelect,
                  viewContainer: { flex: 1, paddingTop: 11 },
                }}
              />
            </View>
          )}
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Switch
          value={newCourse.enableMedicineBoxSync}
          onValueChange={(value) =>
            setNewCourse({
              ...newCourse,
              enableMedicineBoxSync: value,
            })
          }
        />
        <Text style={{ paddingHorizontal: 5, flex: 1, flexWrap: 'wrap' }}>
          Автоматически синхронизировать назначеную дозу с количеством средств в аптечке и обновлять
          количество медикаментов.
        </Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputSelect: {
    marginTop: 10,
    marginRight: 10,
    paddingBottom: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_DARK,
    paddingRight: 30,
    paddingLeft: 10,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_DARK,
    marginVertical: 10,
  },
  label: {
    fontSize: 12,
    paddingLeft: 3,
    paddingTop: 15,
    color: PRIMARY_DARK,
  },
  input: {
    backgroundColor: 'transparent',
  },
  select: {
    flexGrow: 1,
    paddingLeft: 2,
  },
});

export default NewCourseForm;
