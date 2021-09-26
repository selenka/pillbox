import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Dialog, Portal, Button, List, Divider, Title, Text, Chip } from 'react-native-paper';
import Autocomplete from 'react-native-autocomplete-input';
import { CANCEL_COLOR, pillQuantityTypes } from '../../utils/constants';
import { useStore } from '../../store';
import theme from '../../utils/theme';
import InputSpinner from 'react-native-input-spinner';

const filterData = (data, query) => {
  if (!data.length || query === '') {
    return [];
  }
  return data.filter((pill) => {
    return !pill.label.toLowerCase().search(query.toLowerCase());
  });
};

const compareQuery = (item, text) => {
  if (!item.length) {
    return [];
  }
  return item[0].label.toLowerCase() === text.toLowerCase().trim();
};

const getQuantityTypeLabel = (item) => {
  const type = pillQuantityTypes.find((i) => i.value === item.quantityType);
  return type ? type.label : '';
};

const ModalWithAutocomplete = ({ open, setVisible }) => {
  const [query, setQuery] = useState('');
  const [filteredPills, setFilteredPills] = useState([]);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [takenQty, setTakenQty] = useState(1);
  const { pills } = useStore();

  useEffect(() => {
    setFilteredPills(filterData(pills, query));
  }, [query]);

  const hideDialog = () => {
    setQuery('');
    setFilteredPills([]);
    setSelectedItem(undefined);
    setVisible(false);
  };

  return (
    <Portal>
      <Dialog style={{ zIndex: 1000 }} visible={open} onDismiss={hideDialog}>
        <Title style={s.title}>Я хочу принять</Title>
        <Dialog.Content>
          <Autocomplete
            autoCorrect={false}
            hideResults={false}
            placeholder="например: аспирин"
            inputContainerStyle={s.inputContainerStyle}
            data={
              filteredPills.length === 1 && compareQuery(filteredPills, query)
                ? [] // Close suggestion list in case pill title matches query
                : filteredPills
            }
            value={query}
            onChangeText={(text) => setQuery(text)}
            flatListProps={{
              keyboardShouldPersistTaps: 'always',
              keyExtractor: (pill) => String(pill.id),
              renderItem: ({ item }) => (
                <Pressable
                  key={`pressable-${item.id}`}
                  onPress={() => {
                    setQuery(item.label);
                    setSelectedItem(item);
                  }}
                >
                  <List.Item key={item.id} title={item.label} />
                  <Divider key={`divider-${item.id}`} style={s.divider} />
                </Pressable>
              ),
            }}
          />
          <View style={{ flexDirection: 'row' }}>
            <InputSpinner
              width={'50%'}
              rounded={false}
              showBorder={false}
              background={'transparent'}
              textColor={theme.colors.primary}
              style={{
                flex: 1,
                shadowColor: '#fff',
                borderBottomWidth: 1,
              }}
              colorLeft={'transparent'}
              colorRight={'transparent'}
              buttonTextColor={theme.colors.primary}
              colorPress={theme.colors.accent}
              returnKeyType="next"
              step={1}
              min={1}
              max={selectedItem && selectedItem.quantity}
              value={selectedItem && selectedItem.quantity}
              onChange={(num) => {
                setTakenQty(num)
              }}
            />
            <View style={s.qtyContainerLeft}>
              <Text style={{ paddingLeft: 20 }}>
                {selectedItem && getQuantityTypeLabel(selectedItem)}
              </Text>
            </View>
          </View>
          {selectedItem && (
            <View style={s.qtyAvailability}>
              <Text>В наличии</Text>
              <Chip style={{ margin: 10 }}>{selectedItem.quantity}</Chip>
              <Text>{getQuantityTypeLabel(selectedItem)}</Text>
            </View>
          )}
        </Dialog.Content>
        <Dialog.Actions style={{ zIndex: -1 }}>
          <Button color={CANCEL_COLOR} onPress={hideDialog}>
            Отмена
          </Button>
          <Button
            onPress={() => {
              // onConfirm(text);
              // setText('');
              alert(`Лекарство ${selectedItem.label} в количестве ${takenQty}`)
              hideDialog();
            }}
          >
            Принять
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ModalWithAutocomplete;

const s = StyleSheet.create({
  title: {
    marginHorizontal: 25,
    marginVertical: 10,
  },
  inputContainerStyle: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
  },
  divider: {
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: theme.colors.primary,
  },
  qtyContainerLeft: {
    flex: 1,
    width: '50%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  qtyAvailability: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
