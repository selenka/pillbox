import React from 'react';
import { Text, Title, Headline, TextInput, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import theme from '../utils/theme';
import { Styles } from '../utils/styles';

const LoginScreen = () => {
  return (
    <View style={s.container}>
      <Headline>
        <Text style={{ color: theme.colors.accent }}>Heal</Text>
        <Text style={{ color: theme.colors.primary }}>Me</Text>
      </Headline>
      <Title>
        <Text style={{ color: theme.colors.disabled }}>Домашняя Аптечка</Text>
      </Title>
      <View style={s.form}>
        <TextInput
          mode="flat"
          // editable={false}
          // value={course.pill.label}
          autoCompleteType="email"
          enablesReturnKeyAutomatically
          returnKeyType="done"
          underlineColor="transparent"
          outlineColor="transparent"
          style={Styles.input}
        />
      </View>
      <View style={s.form}>
        <TextInput
          mode="flat"
          // editable={false}
          // value={course.pill.label}
          secureTextEntry
          enablesReturnKeyAutomatically
          autoCompleteType="password"
          returnKeyType="done"
          underlineColor="transparent"
          outlineColor="transparent"
          style={Styles.input}
          right={<TextInput.Icon name="eye" color={theme.colors.accent} />}
        />
      </View>
      <View style={s.form}>
        <Button mode="contained" color={theme.colors.accent} onPress={() => alert('Login')}>
          Войти
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    paddingTop: 30,
  },
});
