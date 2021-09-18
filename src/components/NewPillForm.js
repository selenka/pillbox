import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';
import { INPUT_TEXT_COLOR, PRIMARY_DARK } from '../utils/constants';
import RNPickerSelect from 'react-native-picker-select';

// const fields = [
//   {
//     name: 'name',
//     type: 'text',
//     label: 'Наименование',
//   },
//   {
//     name: 'type',
//     type: 'select',
//     label: 'Тип',
//   },
//   {
//     name: 'group',
//     type: 'text',
//     label: 'Группа',
//   },
//   {
//     name: 'quantity',
//     type: 'select',
//     label: 'Количество',
//   },
//   {
//     name: 'expire_date',
//     type: 'select',
//     label: 'Срок годности',
//   },
// ];
console.log('test')
const NewPillForm = ({ pill, setPill }) => {
  return (
    <View>
      <Text style={s.label}>Наименование</Text>
      <TextInput
        autoFocus={true}
        returnKeyType="next"
        enablesReturnKeyAutomatically
        onChangeText={(value) => {
          setPill({ ...pill, label: value });
        }}
        value={pill.label}
        placeholder="..."
        style={s.input}
      />
      <Text style={s.label}>Лекарственная форма</Text>
      <RNPickerSelect
        placeholder={{}}
        onValueChange={(value) => setPill({ ...pill, type: value })}
        items={[
          { label: 'Капсула', value: 'capsule', key: 'key-capsule' },
          { label: 'Таблетка', value: 'pill', key: 'key-pill' },
        ]}
        style={{
          inputIOS: s.input,
        }}
      />
      <Text style={s.label}>Группа</Text>
      <RNPickerSelect
        placeholder={{}}
        onValueChange={(value) => console.log(value)}
        items={[
          { label: 'ЛОР', value: 'capsule', key: 'key-capsule' },
          { label: 'Таблетка', value: 'pill', key: 'key-pill' },
        ]}
        style={{
          inputIOS: s.input,
        }}
      />
    </View>
  );
};

const s = StyleSheet.create({
  label: {
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 15,
    color: PRIMARY_DARK,
  },
  input: {
    fontSize: 16,
    margin: 10,
    color: INPUT_TEXT_COLOR,
    paddingBottom: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_DARK,
    paddingRight: 30,
  },
});

export default NewPillForm;
