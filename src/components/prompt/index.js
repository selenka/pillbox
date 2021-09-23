import * as React from 'react';
import { Dialog, Portal, Button, TextInput, HelperText } from 'react-native-paper';
import { CANCEL_COLOR } from '../../utils/constants';

const DialogModal = ({ open, setVisible, title, onConfirm }) => {
  const [text, setText] = React.useState('');
  const [valid, setValid] = React.useState(true);

  const hideDialog = () => setVisible(false);

  const hasErrors = () => {
    return text.length === 0;
  };

  return (
    <Portal>
      <Dialog visible={open} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            autoFocus={true}
            mode="flat"
            value={text}
            style={{ backgroundColor: 'white' }}
            onChangeText={(text) => {
              setValid(hasErrors);
              setText(text);
            }}
          />
          <HelperText type="error" visible={!valid}>
            Название группы должно содержать как минимум 1 символ
          </HelperText>
        </Dialog.Content>
        <Dialog.Actions>
          <Button color={CANCEL_COLOR} onPress={hideDialog}>
            Отмена
          </Button>
          <Button
            disabled={!valid}
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
