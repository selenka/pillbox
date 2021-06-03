import React, { useState }  from "react";
import { observer } from 'mobx-react-lite';
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button } from 'react-native';
import { useStore } from '../../store';


const MedicineScreen = ({ navigation }) => {
    const { pillsStore } = useStore();
    console.log('>>>render MedicineScreen', pillsStore)
    return (
        <View>
            <Text style={styles.text}>Medicine Content</Text>
            <Button
                onPress={() => navigation.navigate('MedicineItem')}
                title="Add"
            />

            {pillsStore.pills.map((item) => <Text key={item.label} style={styles.text}>{item.label}</Text>)}
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default observer(MedicineScreen);
