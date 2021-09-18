import React from "react";
import {Pressable, StyleSheet, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY_DARK } from "../utils/constants";

const AddMedicineButton = ({ onPress }) => {
    return (
        <View
            style={{
                position: 'absolute',
                backgroundColor: '#f2f2f2',
                borderRadius: '50%',
                zIndex: 1000,
                right: 25,
                bottom: 25,
            }}
        >
            <Pressable onPress={onPress}>
                <Icon name="flask-empty-plus-outline" size={50} color={PRIMARY_DARK} />
            </Pressable>
        </View>
    );
};

export default AddMedicineButton