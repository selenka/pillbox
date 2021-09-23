import { DefaultTheme } from 'react-native-paper';
import { PRIMARY_DARK, ACCENT_COLOR, CANCEL_COLOR } from './constants';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY_DARK,
    accent: ACCENT_COLOR,
    error: CANCEL_COLOR,
  },
};

export default theme;
