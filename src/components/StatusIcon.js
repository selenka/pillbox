import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { RED_COLOR, ORANGE_COLOR, GREEN_COLOR } from '../utils/constants';

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'taken':
      return <Icon name="check-circle" size={25} color={GREEN_COLOR} />;
    case 'pending':
      return <Icon name="alert-circle" size={25} color={ORANGE_COLOR} />;
    case 'missed':
      return <Icon name="x-circle" size={25} color={RED_COLOR} />;
  }
};

export default StatusIcon;
