import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import { TextInput, Text, Chip } from 'react-native-paper';
import { ACCENT_COLOR, INPUT_TEXT_COLOR, pillQuantityTypes, pillTypes } from '../utils/constants';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import InputSpinner from 'react-native-input-spinner';
import theme from '../utils/theme';
import { Styles } from '../utils/styles';

const NewPillForm = ({ newPill, setNewPill }) => {
  const navigation = useNavigation();
  const [valid, setValid] = useState(true);

  return (
    <View style={{ margin: 10 }}>
      <Text style={Styles.label}>Название</Text>
      <TextInput
        mode="flat"
        autoFocus={true}
        error={!valid}
        underlineColor="transparent"
        outlineColor="transparent"
        returnKeyType="next"
        enablesReturnKeyAutomatically
        onChangeText={(value) => {
          setValid(value.length > 0);
          setNewPill({ ...newPill, label: value });
        }}
        value={newPill.label}
        style={Styles.input}
      />
      {/*<HelperText type="error" visible={!valid}>*/}
      {/*  Название должно состоять минимум из одного символа*/}
      {/*</HelperText>*/}
      <Text style={Styles.label}>Лекарственная форма</Text>
      <View style={Styles.navigationSelect}>
        <RNPickerSelect
          placeholder={{}}
          value={newPill.type}
          onValueChange={(value) => setNewPill({ ...newPill, type: value })}
          items={pillTypes}
          style={{
            inputIOS: Styles.inputPickerSelect,
          }}
        />
        <Icon style={{ marginRight: 10 }} name="arrow-right" size={20} color={ACCENT_COLOR} />
      </View>
      <Text style={Styles.label}>Группа</Text>
      <TouchableOpacity
        style={[Styles.navigationSelect, { paddingHorizontal: 10 }]}
        onPress={() => navigation.navigate('MedicineGroupChecklist')}
      >
        {newPill.groups.length ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 5 }}>
            {newPill.groups.map((g) => (
              <Chip mode="outlined" key={`group-tag-${g.id}`}>
                {g.label}
              </Chip>
            ))}
          </View>
        ) : (
          <Text style={{ color: INPUT_TEXT_COLOR }}>Выберите группу</Text>
        )}
        <Icon name="arrow-right" size={20} color={ACCENT_COLOR} />
      </TouchableOpacity>
      <Text style={Styles.label}>Количество</Text>
      <View style={{ flexDirection: 'row', paddingTop: 10 }}>
        <InputSpinner
          width={150}
          colorLeft={theme.colors.accent}
          colorRight={theme.colors.accent}
          returnKeyType="next"
          step={newPill.quantity === 1 ? 9 : 10}
          min={1}
          value={newPill.quantity}
          onChange={(num) => {
            setNewPill({ ...newPill, quantity: num });
          }}
        />
        <View style={[Styles.navigationSelect, { flex: 1, marginLeft: 10 }]}>
          <RNPickerSelect
            placeholder={{}}
            value={newPill.quantityType}
            onValueChange={(value) => setNewPill({ ...newPill, quantityType: value })}
            items={pillQuantityTypes}
            style={{
              inputIOS: Styles.inputPickerSelect,
              viewContainer: { flex: 1, margin: 5 },
            }}
          />
          <Icon style={{ marginRight: 10 }} name="arrow-right" size={20} color={ACCENT_COLOR} />
        </View>
      </View>
      <Text style={Styles.label}>Срок годности:</Text>
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

export default NewPillForm;
