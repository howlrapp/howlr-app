import React from 'react';

import { MenuItem } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const MenuItemLink = ({
  title,
  screen,
}) => {
  const navigation = useNavigation();

  return (
    <MenuItem
      title={title}
      onPress={() => {
        navigation.navigate(screen)
      }}
    />
  );
}

export default React.memo(MenuItemLink);
