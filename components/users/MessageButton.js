import React, { useMemo, useCallback, useState } from 'react';
import { Button, MenuItem, Icon } from '@ui-kitten/components';
import { View, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import useViewer from '../../hooks/useViewer';
import useApp from '../../hooks/useApp';
import useAddChat from '../../hooks/useAddChat';
import useChats from '../../hooks/useChats';
import { GET_CHATS } from '../../hooks/useGetChats';

import ThemedOverflowMenu from '../ThemedOverflowMenu';

const renderMessageIcon = (props) => (
  <Icon name="message-circle" {...props} />
);

const MessageButton = ({
  user,
  style,
  ...props
}) => {
  const navigation = useNavigation();
  const { id: viewerId } = useViewer();
  const { top } = useSafeAreaInsets();

  const { matchKinds } = useApp();
  const selectedMatchKinds = useMemo(() => (
    matchKinds.filter(({ id }) => user.matchKindIds.includes(id))
  ), [user.matchKindIds, matchKinds]);

  const chats = useChats();

  const [ chatFormOpen, setChatFormOpen ] = useState(false);

  const chat = useMemo(() => (
    chats.find(({ contact }) => contact.id === user.id)
  ), [chats])

  const handleGoToChat = useCallback(() => {
    navigation.navigate("Chat", { id: chat.id })
  }, [chat]);

  const handleOpenChatForm = useCallback(() => {
    setChatFormOpen(true);
  }, []);

  const handleCloseChatForm = useCallback(() => {
    setChatFormOpen(false);
  }, []);

  const [ addChat, { loading: addChatLoading }] = useAddChat();

  const handleAddChat = useCallback(async (matchKind) => {
    handleOpenChatForm(false);

    const response = await addChat({
      variables: {
        input: {
          recipientId: user.id,
          matchKindId: matchKind.id
        }
      },
      awaitRefetchQueries: true,
      refetchQueries: [{ query: GET_CHATS }]
    });

    if (response?.data?.addChat?.chat?.id) {
      navigation.navigate("Chat", { id: response.data.addChat.chat.id })
    }
    setChatFormOpen(false);
  }, []);

  const renderMessageButton = useCallback(() => (
    <View
      style={style}
    >
      <Button
        appearance="outline"
        accessoryLeft={renderMessageIcon}
        disabled={addChatLoading || user.id === viewerId || selectedMatchKinds.length === 0}
        onPress={chat ? handleGoToChat : handleOpenChatForm}
        {...props}
      >
        MESSAGE
      </Button>
    </View>
  ), [chat, handleOpenChatForm, handleGoToChat, user.id, viewerId, addChatLoading]);

  return (
    <ThemedOverflowMenu
      anchor={renderMessageButton}
      visible={chatFormOpen}
      onBackdropPress={handleCloseChatForm}
      placement="bottom"
      style={{ marginTop: Platform.OS === 'ios' ? -20 : 20 }}
    >
      {
        selectedMatchKinds.map((matchKind) => (
          <MenuItem
            key={matchKind.id}
            title={matchKind.label.toUpperCase()}
            onPress={() => handleAddChat(matchKind)}
          />
        ))
      }
    </ThemedOverflowMenu>
  )
}

export default React.memo(MessageButton);
