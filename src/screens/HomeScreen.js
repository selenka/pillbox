import React, { useEffect } from 'react';
import { NativeModules, View, StyleSheet } from 'react-native';
import { PRIMARY_DARK, PRIMARY_LIGHT } from '../utils/constants';
import { useModal } from '../store/modal';
import { useMedicine } from '../store/medicine';
import Calendar from '../components/calendar';
// import { Progress } from '../components/HealLevel';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import theme from '../utils/theme';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const HomeScreen = () => {
  const navigation = useNavigation();
  const { setFABVisible } = useModal();
  const { loading } = useMedicine();

  useEffect(() => {
    navigation.addListener('focus', () => {
      setFABVisible(true);
    });
  }, [navigation]);

  return (
    <View style={s.mainContainer}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            size={60}
            animating={true}
            hidesWhenStopped={true}
            color={theme.colors.accent}
          />
        </View>
      ) : (
        <Calendar />
      )}
      {/*<Progress />*/}
      {/*<Calendar />*/}
      {/*<View style={s.mainButtonContainer}>*/}
      {/*  /!*<TouchableOpacity style={[s.mainButton, size]} onPress={() => onTakePillPress()}>*!/*/}
      {/*  /!*  <View style={s.mainButtonInner}>*!/*/}
      {/*  /!*    <Icon name="pill" size={50} color={theme.colors.accent} />*!/*/}
      {/*  /!*  </View>*!/*/}
      {/*  /!*</TouchableOpacity>*!/*/}
      {/*  /!*<ModalWithAutocomplete open={open} setVisible={setVisible} />*!/*/}
      {/*</View>*/}
    </View>
  );
};

const s = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mainButtonContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  mainButton: {
    margin: 20,
    borderWidth: 2,
    borderColor: '#d7d4d4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  mainButtonInner: {
    borderWidth: 2,
    borderColor: '#d7d4d4',
    borderRadius: 50,
    padding: 10,
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
