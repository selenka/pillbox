import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { List, Divider, Button } from 'react-native-paper';
import Swipeable from 'react-native-swipeable';
import theme from "../../utils/theme";
import { CANCEL_COLOR } from "../../utils/constants";

const DefaultList = ({ data }) => {

    const rightButtons = [
        <Button
            key='swipe-button-edit'
            mode="contained"
            style={[s.button, { backgroundColor: theme.colors.accent }]}
            labelStyle={{
                fontSize: 10,
                width: 70
            }}
            onPress={() => console.log(1)}
        >
            Редакт
        </Button>,
        <Button
            mode="contained"
            key='swipe-button-delete'
            style={[s.button, { backgroundColor: CANCEL_COLOR }]}
            labelStyle={{
                fontSize: 10,
                width: 70
            }}
            onPress={() => console.log(2)}
        >
            Удалить
        </Button>
    ];

    return (
        <ScrollView>
            <List.Section>
                {data.map(item => (
                    <>
                        <Swipeable key={`swipe-${item.id}`} rightButtons={rightButtons}>
                            <List.Item key={`default-list-${item.id}`} title={item.label}/>
                            <Divider key={`divider-${item.id}`} style={s.divider}/>
                        </Swipeable>
                    </>
                ))}
            </List.Section>
        </ScrollView>
    )

};

export default DefaultList;

const s = StyleSheet.create({
    button: {
        alignItems: 'center',
        flex: 1,
        width: 80,
        justifyContent: 'center',
        borderRadius: 0
    },
    text: {
        color: theme.colors.primary,
    },
    divider: {
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: theme.colors.primary
    }
})