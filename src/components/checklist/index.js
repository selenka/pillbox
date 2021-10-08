import React, { Fragment } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { PRIMARY_DARK } from '../../utils/constants';
import EmptyMedicinePreview from '../EmptyMedicinePreview';
import { Divider, List } from 'react-native-paper';
import theme from '../../utils/theme';

const Checklist = ({ data = [], list = [], onItemCheck }) => {
  const getChecklist = () => {
    // map pill groups list to general groups list
    list.map((item) => {
      const dataItem = data.find((d) => d.id === item.id);
      if (dataItem) {
        item.checked = dataItem.checked;
      }
      return item;
    });
    return list;
  };

  const checklist = getChecklist();

  const checkbox = (item) => {
    return (
      <Pressable
        key={`pressable-${item.id}`}
        style={{ margin: 5 }}
        onPress={() => {
          const newItem = Object.assign({}, item);
          newItem.checked = !item.checked;
          onItemCheck(newItem);
        }}
      >
        {item.checked ? (
          <Icon
            key={`checked-${item.id}`}
            name="check-circle"
            size={30}
            color={theme.colors.accent}
          />
        ) : (
          <Icon
            key={`unchecked-${item.id}`}
            name="radio-button-unchecked"
            size={30}
            color={theme.colors.accent}
          />
        )}
      </Pressable>
    );
  };
  return (
    <View>
      {checklist.length ? (
        <List.Section key="default-list-section">
          {checklist.map((item) => (
            <Fragment key={`fragment-${item.id}`}>
              <List.Item
                key={`default-list-${item.id}`}
                title={item.label}
                left={() => checkbox(item)}
              />
              <Divider key={`divider-${item.id}`} style={s.divider} />
            </Fragment>
          ))}
        </List.Section>
      ) : (
        <EmptyMedicinePreview
          text="У вас пока нет групп. Нажмите 'Создать', чтобы добавить новую"
          page="group"
        />
      )}
    </View>
  );
};

export default Checklist;

const s = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    borderBottomColor: PRIMARY_DARK,
    borderBottomWidth: 1,
  },
  text: {
    flexGrow: 1,
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    maxWidth: '100%',
    overflow: 'hidden',
    textTransform: 'uppercase',
  },
  divider: {
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: theme.colors.primary,
  },
});
