import React, { useCallback } from 'react';
import { TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import UserAvatar from './UserAvatar';
import useViewer from '../hooks/useViewer';

// import fakeUser from '../marketing/fakeUser';

const renderProfileLink = () => {
  const viewer = useViewer();
  const navigation = useNavigation();

  const goToProfile = useCallback(() => (
    navigation.navigate("ProfileRouter")
  ), []);

  return (
    <TouchableOpacity
      onPress={goToProfile}
    >
      <UserAvatar
        user={viewer}
        size={32}
        indicators={["online"]}
      />
    </TouchableOpacity>
  )
}

const renderSettingsIcon = (props) => (
  <Icon {...props} name='settings-outline' />
)

const renderSettingsLink = () => {
  const navigation = useNavigation();

  const goToSettings = useCallback(() => (
    navigation.navigate("Settings")
  ), []);

  return (
    <TopNavigationAction
      icon={renderSettingsIcon}
      onPress={goToSettings}
    />
  );
}

const HomeTopNavigation = ({
  ...props
}) => {

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
    >
      <TopNavigation
        alignment='center'
        accessoryLeft={renderSettingsLink}
        accessoryRight={renderProfileLink}
        {...props}
      />
    </SafeAreaView>
  );
}

export default React.memo(HomeTopNavigation);