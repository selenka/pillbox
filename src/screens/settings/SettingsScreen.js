import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Styles } from '../../utils/styles';
import { Text } from 'react-native-paper';
import { ACCENT_COLOR, INPUT_TEXT_COLOR } from '../../utils/constants';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const SettingsScreen = () => {
  return (
    <View style={s.mainContainer}>
      <TouchableOpacity
        style={[Styles.navigationSelect, { paddingHorizontal: 10 }]}
        onPress={() => alert('language')}
      >
        <Text style={{ color: INPUT_TEXT_COLOR }}>Язык</Text>
        <Icon name="arrow-right" size={20} color={ACCENT_COLOR} />
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    marginTop: 40,
  },
  text: {
    fontSize: 30,
  },
});

export default SettingsScreen;
