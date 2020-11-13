import React, { useCallback } from 'react';
import { ListItem, Icon } from '@ui-kitten/components';

import UserAvatar from '../UserAvatar';
import LastMessage from './LastMessage';

import { useNavigation } from '@react-navigation/native';

const INDICATORS = ['like', 'online']

const ContactItem = ({ chat }) => {
  const navigation = useNavigation();

  const goToChat = useCallback(() => (
    navigation.navigate("Chat", { id: chat.id })
  ), [chat, navigation]);

  const renderUserAvatar = useCallback(({ style: { height }}) => (
    <UserAvatar user={chat.contact} size={height} indicators={INDICATORS} />
  ), [chat.contat])

  const renderUnreadIndicator = useCallback((props) => (
     chat.unread ? <Icon {...props} name="message-circle" /> : null
  ), [chat.unread])

  const renderLastMessage = useCallback((props) => (
    <LastMessage chat={chat} {...props} />
  ), [chat]);

  return (
    <ListItem
      title={chat.contact.name}
      description={renderLastMessage}
      onPress={goToChat}
      accessoryLeft={renderUserAvatar}
      accessoryRight={renderUnreadIndicator}
    />
  );
}

export default React.memo(ContactItem);
