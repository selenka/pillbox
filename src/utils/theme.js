import { DefaultTheme } from 'react-native-paper';
import { PRIMARY_DARK, PRIMARY_LIGHT, ACCENT_COLOR, CANCEL_COLOR, BACKGROUND_COLOR } from './constants';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY_DARK,
    primaryLight: PRIMARY_LIGHT,
    accent: ACCENT_COLOR,
    error: CANCEL_COLOR,
    background: BACKGROUND_COLOR,
  },
};

export default theme;
