import {Text, View} from "react-native";
import { PREVIEW_IMAGE_COLOR, PREVIEW_TEXT_COLOR } from "../utils/constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";

const EmptyMedicinePreview = () => {
    return (
        <View
            style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    textTransform: 'uppercase',
                    color: PREVIEW_TEXT_COLOR,
                }}
            >
                Как-то тут пусто...
            </Text>
            <Icon name="flask-empty-off" size={200} color={PREVIEW_IMAGE_COLOR} />
        </View>
    );
};

export default EmptyMedicinePreview