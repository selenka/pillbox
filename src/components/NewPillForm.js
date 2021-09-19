import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, TextInput, Text, View, TouchableOpacity, Pressable} from 'react-native';
import {INPUT_TEXT_COLOR, PRIMARY_DARK, PRIMARY_LIGHT} from '../utils/constants';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from "react-native-vector-icons/SimpleLineIcons";
import InputSpinner from "react-native-input-spinner";
import {useStore} from "../store";

const NewPillForm = () => {
    const navigation = useNavigation()
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
        <Text style={s.label}>Количество</Text>
        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <InputSpinner
                skin='clean'
                width={150}
                style={{
                    flex: 1,
                    backgroundColor: PRIMARY_LIGHT,
                    borderWidth: 1,
                    borderColor: PRIMARY_DARK,
                    shadowColor: '#fff'
                }}
                buttonStyle={{
                    backgroundColor: PRIMARY_LIGHT,
                }}
                min={1}
                step={1}
                value={newPill.quantity}
                onChange={(num) => {
                    setNewPill({ ...newPill, quantity: num })
                }}
            />
            <RNPickerSelect
                placeholder={{}}
                value={newPill.quantityType}
                onValueChange={(value) => setNewPill({ ...newPill, quantityType: value })}
                items={[
                    { label: 'капсула', value: 'capsule', key: 'key-capsule' },
                    { label: 'таблетка', value: 'pill', key: 'key-pill' },
                    { label: 'мг', value: 'mg', key: 'key-mg' },
                    { label: 'мл', value: 'ml', key: 'key-ml' },
                ]}
                style={{
                    viewContainer: { flex: 1 },
                    inputIOS: s.input,
                }}
            />
        </View>
        <Text style={s.label}>Срок годности:</Text>
        <DateTimePicker
            testID="dateTimePicker"
            value={newPill.expirationDate || new Date()}
            mode='date'
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
