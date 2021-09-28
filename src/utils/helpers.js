import { pillQuantityTypes } from './constants';

export const getQuantityTypeLabel = (item) => {
  const type = pillQuantityTypes.find((i) => i.value === item.quantityType);
  return type ? type.label : '';
};
