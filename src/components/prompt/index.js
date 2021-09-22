import * as React from 'react';
import { Dialog, Portal, Button, TextInput } from 'react-native-paper';
import { CANCEL_COLOR } from '../../utils/constants';

const DialogModal = ({ open, setVisible, title, onConfirm }) => {
  const [text, setText] = React.useState('');

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={open} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="flat"
            value={text}
            style={{ backgroundColor: 'white' }}
            onChangeText={(text) => setText(text)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button color={CANCEL_COLOR} onPress={hideDialog}>
            Отмена
          </Button>
          <Button
            onPress={() => {
              onConfirm(text);
              setText('');
              hideDialog();
            }}
          >
            Создать
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogModal;
