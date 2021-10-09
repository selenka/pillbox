import { StyleSheet } from 'react-native';
import { FORM_COLOR, PRIMARY_DARK } from './constants';
import theme from './theme';

const INPUT_HEIGHT = 45;

export const Styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    zIndex: 100,
    margin: 16,
    right: 0,
    bottom: 10,
  },
  label: {
    fontSize: 14,
    paddingTop: 14,
    color: PRIMARY_DARK,
  },
  input: {
    height: INPUT_HEIGHT,
    backgroundColor: FORM_COLOR,
    borderTopEndRadius: 6,
    borderTopStartRadius: 6,
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
  },
  inputPickerSelect: {
    height: INPUT_HEIGHT,
    backgroundColor: FORM_COLOR,
    borderTopEndRadius: 6,
    borderTopStartRadius: 6,
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
    paddingHorizontal: 10,
  },
  navigationSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: INPUT_HEIGHT,
    backgroundColor: FORM_COLOR,
    borderRadius: 6,
  },
  accentButton: {
    margin: 10,
    backgroundColor: theme.colors.accent,
    color: theme.colors.background,
  },
  cancelButton: {
    margin: 10,
    backgroundColor: theme.colors.error,
    color: theme.colors.background,
  },
  mainScreenButton: {
    padding: 10,
  },
  disabledButton: {
    opacity: 0.7,
  },
});
