import React, { useCallback } from 'react';

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

  const goToScreen = useCallback(() => {
    navigation.navigate(screen);
  }, [screen, navigation]);

  return (
    <MenuItem
      accessoryRight={ForwardIcon}
      onPress={goToScreen}
      {...props}
    />
  );
}

export default React.memo(MenuItemLink);
