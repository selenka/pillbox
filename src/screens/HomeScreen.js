import React, { useEffect, useState } from 'react';
import {
  NativeModules,
  LayoutAnimation,
  View,
  StyleSheet,
} from 'react-native';
import { PRIMARY_DARK, PRIMARY_LIGHT } from '../utils/constants';
import { useModal } from '../store/modal';
import { useMedicine } from '../store/medicine';
import Calendar from '../components/calendar';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const HomeScreen = () => {
  const { setVisible, setNotification, setFABVisible } = useModal();
  const { pills } = useMedicine();
  const [size, setSize] = useState({
    width: 100,
    height: 100,
  });

  useEffect(() => {
    setFABVisible(true)
  }, [])

  const onTakePillPress = () => {
    // Animate the update
    LayoutAnimation.spring();
    setSize({
      width: size.width + 15,
      height: size.height + 15,
    });
    setTimeout(() => {
      setSize({
        width: size.width,
        height: size.height,
      });
    }, 10);
    setTimeout(() => {
      if (pills.length) {
        setVisible(true);
      } else {
        setNotification({
          open: true,
          text: 'Ваша аптечка пустая',
        });
      }
    }, 500);
  };

  return (
    <View style={s.mainContainer}>
      <Calendar />

      <View style={s.mainButtonContainer}>
        {/*<TouchableOpacity style={[s.mainButton, size]} onPress={() => onTakePillPress()}>*/}
        {/*  <View style={s.mainButtonInner}>*/}
        {/*    <Icon name="pill" size={50} color={theme.colors.accent} />*/}
        {/*  </View>*/}
        {/*</TouchableOpacity>*/}
        {/*<ModalWithAutocomplete open={open} setVisible={setVisible} />*/}
      </View>
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
