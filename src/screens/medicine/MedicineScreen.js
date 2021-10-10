import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, Searchbar } from 'react-native-paper';

import { INPUT_TEXT_COLOR, PRIMARY_DARK } from '../../utils/constants';
import EmptyPreview from '../../components/EmptyPreview';
import { useMedicine } from '../../store/medicine';
import AccordionList from '../../components/accordion';
import { useModal } from '../../store/modal';

const MedicineScreen = () => {
  const { pills, groups } = useMedicine();
  const { setFABVisible } = useModal()
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setFABVisible(true)
  }, [])

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <View style={s.container}>
      <Divider />
      <Searchbar placeholder="Поиск лекарств" onChangeText={onChangeSearch} value={searchQuery} />
      {pills.length ? (
        <AccordionList searchQuery={searchQuery} sections={groups} data={pills} />
      ) : (
        <EmptyPreview text="Как-то тут пусто..." page="medicine" />
      )}
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
  group: {
    fontSize: 12,
    marginHorizontal: 5,
    textTransform: 'uppercase',
    color: INPUT_TEXT_COLOR,
  },
});

export default MedicineScreen;
