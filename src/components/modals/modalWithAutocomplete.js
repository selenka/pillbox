import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dialog, Portal, Button, Title, Text, Chip } from 'react-native-paper';
import { CANCEL_COLOR } from '../../utils/constants';
import { useStore } from '../../store';
import theme from '../../utils/theme';
import InputSpinner from 'react-native-input-spinner';
import AutocompleteInput from '../AutocompleteInput';
import { getQuantityTypeLabel } from '../../utils/helpers';

const ModalWithAutocomplete = ({ open, setVisible }) => {
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [takenQty, setTakenQty] = useState(1);
  const { pills } = useStore();

  const hideDialog = () => {
    setSelectedItem(undefined);
    setTimeout(() => {
      setVisible(false);
    }, 100);
  };

  return (
    <Portal>
      <Dialog style={{ zIndex: 1000 }} visible={open} onDismiss={hideDialog}>
        <Title style={s.title}>Я хочу принять</Title>
        <Dialog.Content>
          <AutocompleteInput
            data={pills}
            placeholder="например: аспирин"
            setSelectedItem={(item) => setSelectedItem(item)}
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
                setTakenQty(num);
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
              alert(`Лекарство ${selectedItem.label} в количестве ${takenQty}`);
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
