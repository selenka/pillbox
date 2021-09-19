import {FlatList, Pressable, Text, View, StyleSheet} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import {PRIMARY_DARK} from "../../utils/constants";
import EmptyMedicinePreview from "../EmptyMedicinePreview";

const Checklist = ({ data = [], list = [], onItemCheck}) => {

    const renderItem = ({ item }) => {
        return (
            <View style={s.item}>
                <Pressable
                    style={{ margin: 5 }}
                    onPress={() => {
                        const newItem = item;
                        newItem.checked = !item.checked
                        onItemCheck(newItem)
                    }}
                >
                    {
                        item.checked
                            ? <Icon name="check-circle" size={30} color={PRIMARY_DARK} />
                            : <Icon name="radio-button-unchecked" size={30} color={PRIMARY_DARK} />
                    }
                </Pressable>
                <Text numberOfLines={1} style={s.text}>
                    {item.value}
                </Text>
            </View>
        )
    };
    return (
        <View >
            {list.length
                ? <FlatList
                    data={list}
                    renderItem={renderItem}
                    keyExtractor={(item) => String(item.id)}
                />
                : <EmptyMedicinePreview text="У вас пока нет групп. Нажмите 'Создать', чтобы добавить новую" page='group' />
            }
        </View>
    )
}

export default Checklist

const s = StyleSheet.create({
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
})