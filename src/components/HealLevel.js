import React, { useEffect } from 'react';
import { Text, ProgressBar } from 'react-native-paper';
import theme from '../utils/theme';
import { View, StyleSheet, NativeModules, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { GREEN_COLOR } from '../utils/constants';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export const Level = () => {
  const startValue = new Animated.Value(1);
  const endValue = 1.2;

  useEffect(() => {
    Animated.loop(
      Animated.spring(startValue, {
        toValue: endValue,
        friction: 1,
        useNativeDriver: true,
      }),
      { iterations: 1000 }
    ).start();
  }, [startValue, endValue]);

  return (
    <View style={s.iconContainer}>
      <Text style={s.level}>1</Text>
      <Animated.View
        style={[
          s.icon,
          {
            transform: [
              {
                scale: startValue,
              },
            ],
          },
        ]}
      >
        <Icon name="heart-alt" size={30} color={GREEN_COLOR} />
      </Animated.View>
    </View>
  );
};

export const Progress = () => {
  return <ProgressBar style={{ borderRadius: 6 }} progress={0.02} color={theme.colors.accent} />;
};

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
    alignItems: 'center',
  },
  level: {
    color: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
  },
  text: {
    color: theme.colors.accent,
    paddingLeft: 10,
    paddingBottom: 5,
  },
});
