import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextInput, Text, Chip, HelperText } from 'react-native-paper';
import {
  INPUT_TEXT_COLOR,
  pillQuantityTypes,
  pillTypes,
  PRIMARY_DARK,
} from '../utils/constants';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import InputSpinner from 'react-native-input-spinner';
import theme from '../utils/theme';

const NewPillForm = ({ newPill, setNewPill }) => {
  const navigation = useNavigation();
  const [valid, setValid] = useState(true);

  return (
    <View>
      <TextInput
        mode="flat"
        autoFocus={true}
        label="Наименование"
        error={!valid}
        returnKeyType="next"
        enablesReturnKeyAutomatically
        onChangeText={(value) => {
          setValid(value.length > 0);
          setNewPill({ ...newPill, label: value });
        }}
        value={newPill.label}
        style={s.input}
      />
      <HelperText type="error" visible={!valid}>
        Название должно состоять минимум из одного символа
      </HelperText>
      <Text style={s.label}>Лекарственная форма</Text>
      <RNPickerSelect
        placeholder={{}}
        value={newPill.type}
        onValueChange={(value) => setNewPill({ ...newPill, type: value })}
        items={pillTypes}
        style={{
          inputIOS: s.inputSelect,
          viewContainer: s.viewContainer,
        }}
      />
      <Text style={s.label}>Группа</Text>
      <View style={s.item}>
        <TouchableOpacity
          style={s.select}
          onPress={() => navigation.navigate('MedicineGroupChecklist')}
        >
          {newPill.groups.length ? (
            <View style={{ flexDirection: 'row' }}>
              {newPill.groups.map((g) => (
                <Chip mode="outlined" key={`group-tag-${g.id}`}>
                  {g.label}
                </Chip>
              ))}
            </View>
          ) : (
            <Text style={{ color: INPUT_TEXT_COLOR }}>Выберите группу</Text>
          )}
        </TouchableOpacity>
        <Icon name="arrow-right" style={{ marginBottom: 10 }} size={20} color={PRIMARY_DARK} />
      </View>
      <Text style={s.label}>Количество</Text>
      <View style={{ flexDirection: 'row', paddingTop: 10 }}>
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
          step={newPill.quantity === 1 ? 9 : 10}
          min={1}
          value={newPill.quantity}
          onChange={(num) => {
            setNewPill({ ...newPill, quantity: num });
          }}
        />
        <RNPickerSelect
          placeholder={{}}
          value={newPill.quantityType}
          onValueChange={(value) => setNewPill({ ...newPill, quantityType: value })}
          items={pillQuantityTypes}
          style={{
            viewContainer: { flex: 1, paddingTop: 11, marginLeft: 10 },
            inputIOS: s.inputSelect,
          }}
        />
      </View>
      <Text style={s.label}>Срок годности:</Text>
      <DateTimePicker
        testID="dateTimePicker"
        minimumDate={new Date()}
        value={newPill.expirationDate || new Date()}
        mode="date"
        display="spinner"
        onChange={(event, date) => setNewPill({ ...newPill, expirationDate: date })}
      />
    </View>
  );
};

const s = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_DARK,
    margin: 10,
  },
  select: {
    flexGrow: 1,
    margin: 10,
    paddingLeft: 2,
  },
  label: {
    fontSize: 12,
    paddingLeft: 23,
    paddingTop: 15,
    color: PRIMARY_DARK,
  },
  input: {
    margin: 10,
    backgroundColor: 'transparent',
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
  viewContainer: {
    paddingLeft: 12,
  },
  tag: {
    borderWidth: 1,
    borderColor: PRIMARY_DARK,
  },
});

export default NewPillForm;
