import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen = () => {
    return (
        <View>
            <Text style={styles.text}>Home Content</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default HomeScreen;
