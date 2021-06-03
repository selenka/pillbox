import React, { useState }  from "react";
import { observer } from 'mobx-react-lite';
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button } from 'react-native';
import { useStore } from '../../store';


const MedicineItemScreen = ({ navigation }) => {
    const { pillsStore } = useStore();
    console.log('>>>render MedicineItemScreen', pillsStore)
    const [pill, setPill] = useState({
        label: '',
    })
    return (
        <View>
            <Text style={styles.text}>Add new Medicine</Text>
            <TextInput
                onChangeText={value => {
                    setPill({ label: value })
                }}
                value={pill.label}
                placeholder="Type something..."
                style={{
                    height: 30,
                    borderWidth: '1px',
                    borderColor: 'black',
                    margin: 10,
                }}
            />
            <Button
                onPress={() => {
                    pillsStore.addNewPill(pill)
                    setPill({ label: ''})
                    navigation.goBack();
                }}
                title="Add Pill"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default observer(MedicineItemScreen);
