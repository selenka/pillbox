import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Medicine')}
            >
                <Text>Medicine</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Courses')}
            >
                <Text>Courses</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        padding: 35,
        borderStyle: 'solid',
        borderColor: '#52ecd0',
        borderWidth: 2,
        borderRadius: 22,
    },
    text: {
        fontSize: 30
    }
});

export default HomeScreen;
