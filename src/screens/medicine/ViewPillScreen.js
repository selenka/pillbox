import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { View, StyleSheet } from 'react-native';
import { Button, List, Chip } from 'react-native-paper';
import { pillQuantityTypes, pillTypes, PRIMARY_DARK, PRIMARY_LIGHT } from '../../utils/constants';
import { useStore } from '../../store';

const getPillFromList = (pills, id) => pills.find((p) => p.id === id);

const ViewPillScreen = ({ route, navigation }) => {
  const {
    params: { pill },
  } = route;
  const { pills, newPill, deletePill } = useStore();

  const [viewPill, setViewPill] = useState(getPillFromList(pills, pill.id));

  useEffect(() => {
    setViewPill(newPill);
  }, [newPill]);

  const quantity = pillQuantityTypes.find((q) => q.value === viewPill.quantityType);
  const type = pillTypes.find((p) => p.value === viewPill.type);

  return (
    <View style={s.container}>
      <View>
        <List.Item title="Тип лекарства" description={type.label} />
        <List.Item title="Количество" description={`${viewPill.quantity} ${quantity.label}`} />
        <List.Item
          title="Срок годности"
          description={moment(viewPill.expirationDate).format('DD-MM-YYYY')}
        />
        <List.Item title="Группы" description={!viewPill.groups.length && '---'} />
        <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
          {viewPill.groups.map((g) => (
            <Chip mode="outlined" key={`view-pill-tag-${g.id}`}>
              {g.label}{' '}
            </Chip>
          ))}
        </View>
      </View>
      <Button
        mode="contained"
        style={s.addButton}
        onPress={() => {
          deletePill(pill.id);
          navigation.goBack();
        }}
        contentStyle={s.buttonContent}
      >
        Удалить
      </Button>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
  },
  form: {
    height: 30,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_DARK,
  },
  button: {
    width: '100%',
    height: 80,
    padding: 20,
    backgroundColor: PRIMARY_DARK,
    borderWidth: 1,
    borderColor: PRIMARY_DARK,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: PRIMARY_LIGHT,
  },
  addButton: {
    borderRadius: 0,
  },
  buttonContent: {
    padding: 20,
  },
});

export default ViewPillScreen;
