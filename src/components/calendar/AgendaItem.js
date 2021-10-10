import React, { useCallback } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { isEmpty } from 'lodash';
import { Text, Title, Button } from 'react-native-paper';
import { FORM_COLOR } from '../../utils/constants';
import StatusIcon from '../StatusIcon';
import moment from 'moment';

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

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item}>
      <View style={styles.rightBlock}>
        <Text>{moment(item.time).format('hh:mm')}</Text>
        <Text style={styles.itemDurationText}>
          <Status item={item} />
        </Text>
      </View>
      <Title>{item.title}</Title>
      <View style={styles.itemButtonContainer}>
        <Button mode="outlined" onPress={buttonPressed}>
          Принять
        </Button>
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
    backgroundColor: FORM_COLOR,
    flexDirection: 'row',
  },
  rightBlock: {
    paddingRight: 10,
  },
  itemHourText: {
    color: 'black',
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
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },
});
