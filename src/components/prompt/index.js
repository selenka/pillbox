import React, {useState} from "react";
import {Alert, Modal, StyleSheet, Text, View, Button, TextInput} from "react-native";
import {CANCEL_COLOR, INPUT_TEXT_COLOR, PRIMARY_DARK} from "../../utils/constants";

const Prompt = ({ title, open, setVisible, onConfirm }) => {
    const [inputValue, setInputValue] = useState('')
    return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={open}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setVisible(!open);
                }}
            >
                <View style={s.centeredView}>
                    <View style={s.modalView}>
                        {title && <Text style={s.modalText}>{title}</Text>}
                        <TextInput
                            autoFocus={true}
                            returnKeyType="next"
                            enablesReturnKeyAutomatically
                            onChangeText={(value) => { setInputValue(value) }}
                            style={s.input}
                        />
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Button
                                onPress={() => setVisible(!open)}
                                color={CANCEL_COLOR}
                                title=" Отмена"
                            />
                            <Button
                                onPress={() => {
                                    onConfirm && onConfirm(inputValue)
                                    setVisible(!open)
                                }}
                                title="Создать"
                            />
                        </View>
                    </View>
                </View>
            </Modal>
    );
};

const s = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 10,
        width: 250,
        backgroundColor: "white",
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#f8c0c0",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        fontSize: 15,
        textAlign: "center"
    },
    input: {
        fontSize: 16,
        width: '100%',
        margin: 10,
        color: INPUT_TEXT_COLOR,
        paddingBottom: 12,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: PRIMARY_DARK,
        paddingRight: 30,
    }
});

export default Prompt;