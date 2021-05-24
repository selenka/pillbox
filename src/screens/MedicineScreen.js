import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MedicineScreen = () => {
    return (
        <View>
            <Text style={styles.text}>Medicine Content</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default MedicineScreen;
