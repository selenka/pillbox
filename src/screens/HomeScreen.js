import React, { useState } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { NativeModules, LayoutAnimation, View, StyleSheet } from 'react-native';
import { PRIMARY_DARK, PRIMARY_LIGHT } from '../utils/constants';
import theme from '../utils/theme';
import { useModal } from '../store/modal';
import Notification from '../components/Notification';
import { useStore } from '../store';
import { Agenda } from 'react-native-calendars';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const HomeScreen = ({ navigation }) => {
  const { open, setVisible, setNotification } = useModal();
  const { pills } = useStore();
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
      <Agenda
        // items={{
        //   '2021-10-03': [{name: 'item 1 - any js object'}],
        //   '2021-10-04': [{name: 'item 2 - any js object', height: 80}],
        //   '2021-10-06': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
        // }}
        showClosingKnob={true}
        renderEmptyData = {() => {return (<View />);}}
        theme={{
          selectedDayBackgroundColor: theme.colors.accent
        }}
      />
      {/*<View style={s.buttonContainer}>*/}
      {/*  <TouchableOpacity style={s.buttonDark} onPress={() => navigation.navigate('Medicine')}>*/}
      {/*    <Text style={[s.text, s.textLight]}>Аптечка</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*  <TouchableOpacity style={s.buttonLight} onPress={() => navigation.navigate('Courses')}>*/}
      {/*    <Text style={[s.text, s.textDark]}>Расписание</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
      {/*<View style={s.mainButtonContainer}>*/}
      {/*  <TouchableOpacity style={[s.mainButton, size]} onPress={() => onTakePillPress()}>*/}
      {/*    <Icon name="pill" size={100} color={theme.colors.accent} />*/}
      {/*  </TouchableOpacity>*/}
      {/*  <ModalWithAutocomplete open={open} setVisible={setVisible} />*/}
      {/*</View>*/}
      <Notification />
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
