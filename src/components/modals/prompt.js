import React, { useState } from 'react';
import { Dialog, Portal, Button, TextInput, HelperText } from 'react-native-paper';
import { CANCEL_COLOR } from '../../utils/constants';

const DialogModal = ({ mode, open, value, setVisible, title, onConfirm }) => {
  const [text, setText] = useState('');

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={open} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="flat"
            error={text && !text.length}
            defaultValue={text || value}
            returnKeyType="next"
            enablesReturnKeyAutomatically
            style={{ backgroundColor: 'white' }}
            onChangeText={(value) => setText(value)}
          />
          <HelperText type="error" visible={text && !text.length}>
            Название группы должно содержать как минимум 1 символ
          </HelperText>
        </Dialog.Content>
        <Dialog.Actions>
          <Button color={CANCEL_COLOR} onPress={hideDialog}>
            Отмена
          </Button>
          <Button
            disabled={!text.length}
            onPress={() => {
              onConfirm(text);
              setText('');
              hideDialog();
            }}
          >
            {mode === 'edit' ? 'Применить' : 'Создать'}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogModal;
