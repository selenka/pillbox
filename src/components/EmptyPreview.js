import React from 'react';
import { View } from 'react-native';
import { Caption } from 'react-native-paper';
import { PREVIEW_IMAGE_COLOR } from '../utils/constants';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const EmptyPreview = ({ text, page }) => {
  const getIcon = (page) => {
    switch (page) {
      case 'group':
        return <SimpleLineIcon name="flag" size={200} color={PREVIEW_IMAGE_COLOR} />;
      case 'courses':
        return (
          <MaterialCommunityIcon name="calendar-clock" size={200} color={PREVIEW_IMAGE_COLOR} />
        );
      case 'calendar':
        return <FontAwesome5 name="pills" size={200} color={PREVIEW_IMAGE_COLOR} />;
      case 'medicine':
      default:
        return (
          <MaterialCommunityIcon name="flask-empty-off" size={200} color={PREVIEW_IMAGE_COLOR} />
        );
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {text && <Caption style={{ textAlign: 'center' }}>{text}</Caption>}
      {getIcon(page)}
    </View>
  );
};

export default EmptyPreview;
