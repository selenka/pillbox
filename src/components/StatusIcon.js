import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { STATUS_MISSED, STATUS_PENDING, STATUS_TAKEN } from '../utils/constants';

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'taken':
      return <Icon name="check-circle" size={25} color={STATUS_TAKEN} />;
    case 'pending':
      return <Icon name="alert-circle" size={25} color={STATUS_PENDING} />;
    case 'missed':
      return <Icon name="x-circle" size={25} color={STATUS_MISSED} />;
  }
};

export default StatusIcon;
