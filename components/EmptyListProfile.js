import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import EmptyList from './EmptyList';

const EmptyListProfile = ({ onPressCallToAction, ...props }) => {
  const navigation = useNavigation();

  const goToProfile = useCallback(() => {
    navigation.navigate("ProfileRouter");
    if (onPressCallToAction) {
      onPressCallToAction();
    }
  }, []);

  return (
    <EmptyList
      callToAction="Edit my profile"
      onPressCallToAction={goToProfile}
      {...props}
    />
  )
}

export default React.memo(EmptyListProfile);
