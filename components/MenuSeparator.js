import React from 'react';
import { View } from 'react-native';

const MAPPING = {
  'tiny': 5,
  'small': 10,
  'medium' : 20,
  'large': 40,
}

const MenuSeparator = ({ size = 'medium', ...props }) => {
  return (
    <View style={{ height: MAPPING[size] }} {...props} />
  )
}

export default React.memo(MenuSeparator);
