import React from 'react'
import { Text, ProgressBar } from 'react-native-paper';
import theme from '../utils/theme';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { GREEN_COLOR } from '../utils/constants';

export const Level = () => {
  return (
    <View style={s.iconContainer}>
      <Text style={s.level}>1</Text>
      <Icon style={s.icon} name='heart-alt' size={30} color={GREEN_COLOR} />
    </View>
  )
}

export const Progress = () => {
  return (
    <ProgressBar style={{ borderRadius: 6 }} progress={0.1} color={theme.colors.accent} />
  )
}

const s = StyleSheet.create({
  container: {
    margin: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'relative',
    marginLeft: 10,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  level: {
    color: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute'
  },
  text: {
    color: theme.colors.accent,
    paddingLeft: 10,
    paddingBottom: 5
  }
})