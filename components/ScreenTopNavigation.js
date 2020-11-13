import React, { useCallback } from 'react';
import { TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import {
  SafeAreaView,
} from 'react-native-safe-area-context';

const renderCloseIcon = (props) => (
  <Icon {...props} name={Platform.OS === 'ios' ? 'arrow-back-outline' : 'close-outline'} />
);

const renderBackLink = () => {
  const navigation = useNavigation();

  const goBack = useCallback(() => (
    navigation.goBack()
  ), []);

  return (
    <TopNavigationAction
      icon={renderCloseIcon}
      onPress={goBack}
    />
  );
}

const ScreenTopNavigation = ({
  ...props
}) => {

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
    >
      <TopNavigation
        alignment='center'
        accessoryLeft={renderBackLink}
        {...props}
      />
    </SafeAreaView>
  );
}

export default React.memo(ScreenTopNavigation);