import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper'
import { PRIMARY_DARK, PRIMARY_LIGHT } from '../utils/constants';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={s.buttonContainer}>
      <TouchableOpacity style={s.buttonDark} onPress={() => navigation.navigate('Medicine')}>
        <Text style={[s.text, s.textLight]}>Аптечка</Text>
      </TouchableOpacity>
      <TouchableOpacity style={s.buttonLight} onPress={() => navigation.navigate('Courses')}>
        <Text style={[s.text, s.textDark]}>Курсы</Text>
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonLight: {
    padding: 35,
    color: PRIMARY_LIGHT,
    borderRadius: 22,
    backgroundColor: '#fff',
  },
  buttonDark: {
    padding: 35,
    color: PRIMARY_LIGHT,
    borderRadius: 22,
    backgroundColor: PRIMARY_DARK,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  textLight: {
    color: PRIMARY_LIGHT,
  },
  textDark: {
    color: PRIMARY_DARK,
  },
});

export default HomeScreen;
