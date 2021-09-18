import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';

import { PRIMARY_DARK } from '../../utils/constants';
import AddMedicineButton from "../../components/AddMedicineButton";
import EmptyMedicinePreview from "../../components/EmptyMedicinePreview";
import {useStore} from "../../store";

const MedicineScreen = ({ navigation }) => {
  const { pills, deletePill } = useStore();

  const renderItem = ({ item }) => {
    return (
        <View style={s.item}>
            <Text numberOfLines={1} style={s.text}>
                {item.label}
            </Text>
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
      <AddMedicineButton onPress={() => navigation.navigate('MedicineItem')} />
      {pills.length ? (
        <FlatList
          data={pills}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <EmptyMedicinePreview text="Как-то тут пусто..." page="medicine"/>
      )}
    </View>
  );
};

const s = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
    },
      item: {
        display: 'flex',
        flexDirection: 'row',
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
});

export default MedicineScreen;
