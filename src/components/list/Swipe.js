import React from 'react';
// import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import theme from '../../utils/theme';
import { List, Text } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CANCEL_COLOR, ORANGE_COLOR } from '../../utils/constants';

const closeRow = (rowMap, rowKey) => {
  if (rowMap[rowKey]) {
    rowMap[rowKey].closeRow();
  }
};

export const SwipeListItem = ({ item }, children) => {
  return (
    <List.Item
      key={item.key}
      title={item.label}
      style={styles.rowFront}
      // right={() => (
      //   <SimpleLineIcon name="arrow-left" size={30} color={theme.colors.accent} />
      // )}
    >
      {children}
    </List.Item>
  );
};

export const SwipeItem = ({ itemKey, children }) => {
  return (
    <View key={String(itemKey)} style={styles.rowFront}>
      {children}
    </View>
  );
};

export const SwipeHiddenItem = ({
  item,
  rowMap,
  onLeftSwipeRightButton,
  onLeftSwipeLeftButton,
}) => {
  return (
    <View
      style={[
        styles.rowBack,
        onLeftSwipeLeftButton && styles.backForTwoButtons,
        !onLeftSwipeLeftButton && styles.backForOneButtons,
      ]}
    >
      {onLeftSwipeLeftButton && (
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => {
            closeRow(rowMap, item.key);
            onLeftSwipeLeftButton(item.id);
          }}
        >
          <Text style={styles.backTextWhite}>Редакт.</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          closeRow(rowMap, item.key);
          onLeftSwipeRightButton(item.id);
        }}
      >
        <Text style={styles.backTextWhite}>Удалить</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.background,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 20,
  },
  rowBack: {
    overflow: 'hidden',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 6,
  },
  backForTwoButtons: {
    backgroundColor: ORANGE_COLOR,
  },
  backForOneButtons: {
    backgroundColor: CANCEL_COLOR,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: ORANGE_COLOR,
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: CANCEL_COLOR,
    right: 0,
  },
});
