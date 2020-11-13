import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import EmptyList from './EmptyList';

const EmptyListProfile = ({ onPressCallToAction, ...props }) => {
  const navigation = useNavigation();

  const goToUsers = useCallback(() => {
    navigation.navigate("Users");
    if (onPressCallToAction) {
      onPressCallToAction();
    }
  }, []);

  return (
    <EmptyList
      callToAction="Search for friends"
      onPressCallToAction={goToUsers}
      {...props}
    />
  )
}

export default React.memo(EmptyListProfile);
