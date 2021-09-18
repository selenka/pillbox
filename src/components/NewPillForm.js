import React, { useState } from 'react';
import {StyleSheet, TextInput, Text, View, TouchableOpacity, Pressable} from 'react-native';
import { INPUT_TEXT_COLOR, PRIMARY_DARK } from '../utils/constants';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/SimpleLineIcons";
import {useStore} from "../store";

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
const NewPillForm = ({ navigation }) => {
    const { newPill, setNewPill } = useStore()

  return (
    <View>
      <Text style={s.label}>Наименование</Text>
      <TextInput
        autoFocus={true}
        returnKeyType="next"
        enablesReturnKeyAutomatically
        onChangeText={(value) => {
            setNewPill({ ...newPill, label: value });
        }}
        value={newPill.label}
        placeholder="..."
        style={s.input}
      />
      <Text style={s.label}>Лекарственная форма</Text>
      <RNPickerSelect
        placeholder={{}}
        value={newPill.type}
        onValueChange={(value) => setNewPill({ ...newPill, type: value })}
        items={[
          { label: 'Капсула', value: 'capsule', key: 'key-capsule' },
          { label: 'Таблетка', value: 'pill', key: 'key-pill' },
        ]}
        style={{
          inputIOS: s.input,
        }}
      />
      <Text style={s.label}>Группа</Text>
        <View style={s.item}>
            <TouchableOpacity
                style={s.select}
                onPress={() => navigation.navigate('MedicineGroup')}
            >
                {
                    newPill.groups.length
                        ? <View style={{ flexDirection: 'row' }}>
                                {newPill.groups.map(g => <Text  key={g.id} style={g.tag}>{g.value}</Text>)}
                            </View>
                        : <Text style={{ color: INPUT_TEXT_COLOR }}>Выберите группу</Text>
                }
            </TouchableOpacity>
            <Icon name="arrow-right" style={{ marginBottom: 10}} size={20} color={PRIMARY_DARK} />
        </View>
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
        flexGrow: 1
    },
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
    tag: {
        borderWidth: 1,
        borderColor: PRIMARY_DARK
    }
});

export default NewPillForm;
