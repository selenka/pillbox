import { DefaultTheme } from "react-native-paper";
import {PRIMARY_DARK} from "./constants";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: PRIMARY_DARK,
        accent: '#f1c40f',
    },
};

export default theme