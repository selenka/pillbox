import { StyleSheet } from 'react-native';
import { ACCENT_COLOR, BACKGROUND_COLOR, FORM_COLOR, PRIMARY_DARK } from './constants';
// import { PRIMARY_DARK, PRIMARY_LIGHT } from './constants';

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
    backgroundColor: ACCENT_COLOR,
    color: BACKGROUND_COLOR,
  },
  mainScreenButton: {
    padding: 10,
  },
  disabledButton: {
    opacity: 0.7,
  },
});
