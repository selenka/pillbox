import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CoursesScreen = () => {
    console.log('>>>render CoursesScreen')
    return (
        <View>
            <Text style={styles.text}>Courses Content</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default CoursesScreen;
