import React, { useState } from 'react';
import { NativeModules, LayoutAnimation, View, StyleSheet, Text } from 'react-native';
import { PRIMARY_DARK, PRIMARY_LIGHT } from '../utils/constants';
import theme from '../utils/theme';
import { useModal } from '../store/modal';
import { useMedicine } from '../store/medicine';
import Calendar from '../components/calendar';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const HomeScreen = () => {
  const { setVisible, setNotification } = useModal();
  const { pills } = useMedicine();
  const [size, setSize] = useState({
    width: 200,
    height: 200,
  });

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
      <View style={{ paddingVertical: 50 }}>
        <Text>Missed</Text>
      </View>

      {/*<View style={s.mainButtonContainer}>*/}
      {/*  <TouchableOpacity style={[s.mainButton, size]} onPress={() => onTakePillPress()}>*/}
      {/*    <Icon name="pill" size={100} color={theme.colors.accent} />*/}
      {/*  </TouchableOpacity>*/}
      {/*  <ModalWithAutocomplete open={open} setVisible={setVisible} />*/}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButton: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
