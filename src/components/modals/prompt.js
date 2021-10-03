import React, { useState } from 'react';
import { Dialog, Portal, Button, TextInput, HelperText } from 'react-native-paper';
import { CANCEL_COLOR } from '../../utils/constants';
import { Styles } from '../../utils/styles';
import theme from '../../utils/theme';

const DialogModal = ({ mode, open, value, setVisible, title, onConfirm }) => {
  const [text, setText] = useState('');

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog style={{ borderRadius: 6 }} visible={open} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="flat"
            defaultValue={text || value}
            underlineColor='transparent'
            outlineColor='transparent'
            returnKeyType="next"
            enablesReturnKeyAutomatically
            onChangeText={(value) => setText(value)}
            style={Styles.input}
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
            style={[
              Styles.accentButton,
              !text.length && Styles.disabledButton
            ]}
            labelStyle={{ color: theme.colors.background }}
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
