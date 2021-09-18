import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { observer } from 'mobx-react-lite';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useStore } from '../../store';
import { PRIMARY_DARK } from '../../utils/constants';
import AddMedicineButton from "../../components/AddMedicineButton";
import EmptyMedicinePreview from "../../components/EmptyMedicinePreview";


const Item = observer(({ id, label, onDelete }) => {
  return (
    <View style={s.item}>
      <Text numberOfLines={1} style={s.text}>
        {label}
      </Text>
      <Pressable
        style={{ margin: 5, transform: [{ rotate: '45deg' }] }}
        onPress={() => onDelete(id)}
      >
        <FeatherIcon name="plus" size={30} color={PRIMARY_DARK} />
      </Pressable>
    </View>
  );
});

const MedicineScreen = ({ navigation }) => {
  const { pillsStore } = useStore();

  const renderItem = ({ item }) => {
    return <Item {...item} onDelete={(id) => pillsStore.removePill(id)} />;
  };

  return (
    <View style={s.container}>
      <AddMedicineButton onPress={() => navigation.navigate('MedicineItem')} />
      {pillsStore.pills.length ? (
        <FlatList
          data={pillsStore.pills}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <EmptyMedicinePreview />
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

export default observer(MedicineScreen);
