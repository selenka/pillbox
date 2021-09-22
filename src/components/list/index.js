import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Divider, Button } from 'react-native-paper';
import Swipeable from 'react-native-swipeable';
import theme from '../../utils/theme';
import { CANCEL_COLOR } from '../../utils/constants';
import EmptyMedicinePreview from '../EmptyMedicinePreview';
import nextId from 'react-id-generator';

let buttonId = nextId('button');
const DefaultList = ({ data }) => {
  const rightButtons = [
    <Button
      key={buttonId}
      mode="contained"
      style={[s.button, { backgroundColor: theme.colors.accent }]}
      labelStyle={{
        fontSize: 10,
        width: 70,
      }}
      onPress={() => console.log(1)}
    >
      Редакт
    </Button>,
    <Button
      mode="contained"
      key={buttonId}
      style={[s.button, { backgroundColor: CANCEL_COLOR }]}
      labelStyle={{
        fontSize: 10,
        width: 70,
      }}
      onPress={() => console.log(2)}
    >
      Удалить
    </Button>,
  ];
  console.log('Default list data', data);
  return (
    <View>
      {data.length ? (
        <List.Section key="default-list-section">
          {data.map((item) => (
            <Fragment key={`fragment-${item.id}`}>
              <Swipeable key={`swipe-${item.id}`} rightButtons={rightButtons}>
                <List.Item key={`default-list-${item.id}`} title={item.label} />
                <Divider key={`divider-${item.id}`} style={s.divider} />
              </Swipeable>
            </Fragment>
          ))}
        </List.Section>
      ) : (
        <EmptyMedicinePreview
          key="default-list-preview"
          text="У вас пока нет групп. Нажмите 'Создать', чтобы добавить новую"
          page="group"
        />
      )}
    </View>
  );
};

export default DefaultList;

const s = StyleSheet.create({
  button: {
    alignItems: 'center',
    flex: 1,
    width: 80,
    justifyContent: 'center',
    borderRadius: 0,
  },
  text: {
    color: theme.colors.primary,
  },
  divider: {
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: theme.colors.primary,
  },
});
