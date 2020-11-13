import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import ScreenTopNavigation from '../ScreenTopNavigation';
import UserNameHeader from '../UserNameHeader';
import ChatActionsMenu from './ChatActionsMenu';

const ChatTopNavigation = ({
  chat
}) => {
  const navigation = useNavigation();

  const handleGoToProfile = useCallback(() => {
    if (chat?.contact?.id) {
      navigation.navigate("User", { id: chat.contact.id })
    }
  }, [chat?.contact?.id, navigation]);

  const renderRightActions = useCallback(() => {
    return (
      <ChatActionsMenu
        chat={chat}
      />
    );
  }, [chat]);

  return (
    <ScreenTopNavigation
      title={(props) => {
        if (!chat) {
          return (null);
        }

        return (
          <UserNameHeader
            user={chat.contact}
            textProps={props}
            onPress={chat.contact.system ? undefined : handleGoToProfile}
          />
        );
      }}
      accessoryRight={renderRightActions}
    />
  );
}

export default React.memo(ChatTopNavigation);
