import {Text, View} from "react-native";
import {PREVIEW_IMAGE_COLOR, PREVIEW_TEXT_COLOR} from "../utils/constants";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import React from "react";

const EmptyMedicinePreview = ({ text, page}) => {

    const getIcon = (page) => {
        switch (page) {
            case 'group':
                return <SimpleLineIcon name="flag" size={200} color={PREVIEW_IMAGE_COLOR} />
            case 'medicine':
            default:
                return  <MaterialCommunityIcon name="flask-empty-off" size={200} color={PREVIEW_IMAGE_COLOR} />
        }
    }

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
                    padding: 20,
                    textTransform: 'uppercase',
                    color: PREVIEW_TEXT_COLOR,
                    textAlign: 'center'
                }}
            >
                {text}
            </Text>
            {getIcon(page)}
        </View>
    );
};

export default EmptyMedicinePreview