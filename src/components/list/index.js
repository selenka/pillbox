import React, { useMemo } from 'react';
import { View } from 'react-native';
import EmptyPreview from '../EmptyPreview';
import { SwipeListView } from 'react-native-swipe-list-view';
import { SwipeHiddenItem, SwipeListItem } from './Swipe';

const DefaultList = ({ data, onEditPress, onDeletePress }) => {
  const list = useMemo(() => {
    return data.map((item, i) => ({ ...item, key: `${i}` }));
  }, [data]);

  return (
    <View>
      {data.length ? (
        <SwipeListView
          disableRightSwipe
          data={list}
          renderItem={({ item }) => <SwipeListItem item={item} />}
          renderHiddenItem={({ item }, rowMap) => {
            return (
              <SwipeHiddenItem
                item={item}
                rowMap={rowMap}
                onLeftSwipeRightButton={(id) => onDeletePress(id)}
                onLeftSwipeLeftButton={(id) => onEditPress(id)}
              />
            );
          }}
          leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      ) : (
        <EmptyPreview
          key="default-list-preview"
          text="У вас пока нет групп. Нажмите 'Создать', чтобы добавить новую"
          page="group"
        />
      )}
    </View>
  );
};

export default DefaultList;
