import React, { useCallback } from 'react';
import { TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { Platform, View } from 'react-native';
import {
  useSafeAreaInsets,
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
  const { right, top, left } = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingLeft: left,
        paddingTop: top,
        paddingRight: right
      }}
    >
      <TopNavigation
        alignment='center'
        accessoryLeft={renderBackLink}
        {...props}
      />
    </View>
  );
}

export default React.memo(ScreenTopNavigation);