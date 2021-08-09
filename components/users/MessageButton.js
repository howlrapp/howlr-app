import React, { useMemo, useCallback } from 'react';
import { Button, Icon } from '@ui-kitten/components';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import useViewer from '../../hooks/useViewer';
import useApp from '../../hooks/useApp';
import useAddChat from '../../hooks/useAddChat';
import useChats from '../../hooks/useChats';
import { GET_CHATS } from '../../hooks/useGetChats';

import useResponsiveActionSheet from '../../hooks/useResponsiveActionSheet';

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

  const { matchKinds } = useApp();
  const selectedMatchKinds = useMemo(() => (
    matchKinds.filter(({ id }) => user.matchKindIds.includes(id))
  ), [user.matchKindIds, matchKinds]);

  const chats = useChats();

  const chat = useMemo(() => (
    chats.find(({ contact }) => contact.id === user.id)
  ), [chats])

  const handleGoToChat = useCallback(() => {
    navigation.navigate("Chat", { id: chat.id })
  }, [chat]);

  const [ addChat, { loading: addChatLoading }] = useAddChat();

  const handleAddChat = useCallback(async (matchKind) => {
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
  }, []);


  const showActionSheetWithOptions = useResponsiveActionSheet();

  const handleOpenChatForm = useCallback(() => {
    showActionSheetWithOptions(
      {
        options: [ ...selectedMatchKinds.map(({ label }) => label), "Cancel" ],
        cancelButtonIndex: selectedMatchKinds.length,
        title: `What are you up to?`,
      },
      async (buttonIndex) => {
        if (buttonIndex < selectedMatchKinds.length) {
          return (
            handleAddChat(selectedMatchKinds[buttonIndex])
          );
        }
      }
    )
  }, [user.name, selectedMatchKinds, handleAddChat]);

  return (
    <View
      style={style}
    >
      <Button
        accessoryLeft={renderMessageIcon}
        disabled={addChatLoading || user.id === viewerId || selectedMatchKinds.length === 0}
        onPress={chat ? handleGoToChat : handleOpenChatForm}
        {...props}
      >
        MESSAGE
      </Button>
    </View>
  )
}

export default React.memo(MessageButton);
