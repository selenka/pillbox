import React, { useCallback } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { isEmpty } from 'lodash';
import { Text, Title, Button } from 'react-native-paper';
import StatusIcon from '../StatusIcon';
import moment from 'moment';
import theme from '../../utils/theme';
import EmptyPreview from '../EmptyPreview';

export const AgendaItem = React.memo(function AgendaItem(props) {
  // console.warn('item rendered', Date.now());
  const { item } = props;

  const Status = ({ item }) => {
    let status = 'pending';
    const currentTime = moment();
    const itemTime = moment(item.time);

    if (!item.taken && currentTime.diff(itemTime) > 0) {
      status = 'missed';
    } else if (item.taken) {
      status = 'taken';
    }

    return <StatusIcon status={status} />;
  };

  const buttonPressed = useCallback(() => {
    Alert.alert('Show me more');
  }, []);

  const itemPressed = useCallback(() => {
    Alert.alert(item.title);
  }, []);

  console.log('item', item);
  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Title style={styles.emptyItemText}>Нет назначенных курсов приема</Title>
        <EmptyPreview page="calendar" />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item}>
      <View style={styles.rightBlock}>
        <Text style={styles.itemHourText}>{moment(item.time).format('hh:mm')}</Text>
        <Text style={styles.itemDurationText}>
          <Status item={item} />
        </Text>
      </View>
      <Title style={[styles.titleItem, item.taken && styles.statusTaken]}>{item.title}</Title>
      <View style={styles.itemButtonContainer}>
        {!item.taken && (
          <Button mode="outlined" onPress={buttonPressed}>
            Принять
          </Button>
        )}
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: theme.colors.accent,
    opacity: 0.7,
    // borderWidth: 1,
    // borderColor: theme.colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightBlock: {
    paddingRight: 10,
  },
  titleItem: {
    color: theme.colors.background,
  },
  statusTaken: {
    opacity: 0.4,
  },
  itemHourText: {
    color: theme.colors.background,
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  emptyItem: {
    flex: 1,
    height: '100%',
    margin: 20,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  emptyItemText: {
    opacity: 0.7,
    color: theme.colors.accent,
  },
});
