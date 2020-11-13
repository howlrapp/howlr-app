import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import EmptyList from './EmptyList';

const EmptyListGroups = ({ onPressCallToAction, ...props }) => {
  const navigation = useNavigation();

  const goToUsers = useCallback(() => {
    navigation.navigate("GroupsRouter", { screen: "Groups" });
    if (onPressCallToAction) {
      onPressCallToAction();
    }
  }, [navigation]);

  return (
    <EmptyList
      callToAction="Join more groups"
      onPressCallToAction={goToUsers}
      {...props}
    />
  )
}

export default React.memo(EmptyListGroups);
