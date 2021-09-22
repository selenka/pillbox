import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, FAB, Searchbar } from 'react-native-paper';

import { INPUT_TEXT_COLOR, PRIMARY_DARK } from '../../utils/constants';
import EmptyMedicinePreview from '../../components/EmptyMedicinePreview';
import { useStore } from '../../store';
import AccordionList from '../../components/accordion';

const MedicineScreen = ({ navigation }) => {
  const { pills, groups } = useStore();
  const [searchQuery, setSearchQuery] = useState('')

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  }

  const filterData = (data) => {
    return data.filter((pill) => {
      return !pill.label.toLowerCase().search(searchQuery.toLowerCase())
    })
  }

  return (
    <View style={s.container}>
      <Button icon="plus" mode="text" onPress={() => navigation.navigate('MedicineGroup')}>
        Управление группами
      </Button>
      <Searchbar
          placeholder='Поиск лекарств'
          onChangeText={onChangeSearch}
          value={searchQuery}
      />
      <FAB
        style={s.fab}
        icon="flask-empty-plus-outline"
        onPress={() => {
          navigation.navigate('MedicineItem');
        }}
      />
      {pills.length ? (
        <AccordionList sections={groups} data={filterData(pills)} />
      ) : (
        <EmptyMedicinePreview text="Как-то тут пусто..." page="medicine" />
      )}
    </View>
  );
};

const s = StyleSheet.create({
  fab: {
    position: 'absolute',
    zIndex: 100,
    margin: 16,
    right: 0,
    bottom: 0,
  },
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
