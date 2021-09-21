import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Button, FAB } from 'react-native-paper';

import { INPUT_TEXT_COLOR, PRIMARY_DARK } from '../../utils/constants';
import EmptyMedicinePreview from "../../components/EmptyMedicinePreview";
import { useStore} from "../../store";
import AccordionList from "../../components/accordion";

const MedicineScreen = ({ navigation }) => {
  const { pills, groups, deletePill} = useStore();

  const renderItem = ({ item }) => {
    return (
        <View style={s.item}>
            <View>
                <Text numberOfLines={1} style={s.group}>[{item.groups.map(i => i.value).join(', ')}]</Text>
                <Text numberOfLines={1} style={s.text}>{item.label}</Text>
            </View>
            <Pressable
                style={{ margin: 5, transform: [{ rotate: '45deg' }] }}
                onPress={() => deletePill(item.id)}
            >
                <FeatherIcon name="plus" size={30} color={PRIMARY_DARK} />
            </Pressable>
        </View>
    )
  };

  return (
    <View style={s.container}>
        <Button icon="plus" mode="text" onPress={() => navigation.navigate('MedicineGroup')}>
            Управление группами
        </Button>
        <FAB
            style={s.fab}
            icon='flask-empty-plus-outline'
            onPress={() => {
                navigation.navigate('MedicineItem')
            }}
        />
      {pills.length ? (
          <AccordionList sections={groups} data={pills} />
      ) : (
        <EmptyMedicinePreview text="Как-то тут пусто..." page="medicine"/>
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
            color: INPUT_TEXT_COLOR
        }
});

export default MedicineScreen;
