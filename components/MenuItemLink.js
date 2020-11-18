import React from 'react';

import { MenuItem, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

const MenuItemLink = ({
  screen,
  ...props
}) => {
  const navigation = useNavigation();

  return (
    <MenuItem
      accessoryRight={ForwardIcon}
      onPress={() => {
        navigation.navigate(screen)
      }}
      {...props}
    />
  );
}

export default React.memo(MenuItemLink);
