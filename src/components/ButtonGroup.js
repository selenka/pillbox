import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../utils/theme';

const ButtonGroup = ({
  buttons,
  stretchButtons,
  multiple,
  fontSize,
  defaultSelection,
  onButtonToggle,
}) => {
  const [selected, setSelected] = useState(null);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    if (defaultSelection) {
      multiple ? setSelection(defaultSelection) : setSelected(defaultSelection);
    } else {
      multiple ? setSelection([]) : setSelected(buttons[0].value);
    }
  }, [defaultSelection]);

  const getActiveSelection = (value) => {
    let item;
    if (multiple && selection.length) {
      item = selection.find((s) => s === value);
    } else {
      item = selected;
    }
    return item === value ? 'contained' : 'outlined';
  };

  const handleMultiple = (value) => {
    const item = selection.find((s) => s === value);
    if (item) {
      setSelection(selection.filter((s) => s !== value));
    } else {
      setSelection([...selection, value]);
    }
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {buttons.map((b, index) => {
        return (
          <Button
            key={b.value}
            mode={getActiveSelection(b.value)}
            onPress={() => {
              multiple ? handleMultiple(b.value) : setSelected(b.value);
              onButtonToggle && onButtonToggle(b);
            }}
            style={[
              s.button,
              getActiveSelection(b.value) === 'contained' && s.selectedButton,
              index === 0 && s.firstChild,
              index === 0 && getActiveSelection(b.value) === 'contained' && s.selectedFirstButton,
              index === buttons.length - 1 && s.lastChild,
              index === buttons.length - 1 &&
                getActiveSelection(b.value) === 'contained' &&
                s.selectedLastButton,
              stretchButtons && s.stretchButtons,
              multiple && s.multipleButtons,
            ]}
            labelStyle={[multiple && s.multipleText, fontSize && { fontSize }]}
          >
            {b.label}
          </Button>
        );
      })}
    </View>
  );
};

const s = StyleSheet.create({
  button: {
    borderRadius: 0,
  },
  stretchButtons: {
    flex: 1,
  },
  multipleButtons: {
    minWidth: 10,
  },
  multipleText: {
    fontSize: 10,
  },
  selectedButton: {
    borderRightWidth: 1,
    borderRightColor: theme.colors.primaryLight,
  },
  selectedFirstButton: {
    borderRightWidth: 1,
    borderRightColor: theme.colors.primaryLight,
  },
  selectedLastButton: {
    borderRightWidth: 0,
  },
  firstChild: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 0,
  },
  lastChild: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftWidth: 0,
  },
});

export default ButtonGroup;
