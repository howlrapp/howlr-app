import React, { useEffect, useCallback, useMemo } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import { Divider, useTheme } from '@ui-kitten/components';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import useGetChat from '../hooks/useGetChat';
import useReadChat from '../hooks/useReadChat';
import useActionCableChannel from '../hooks/useActionCableChannel';
import usePreventMessageNotifications from '../hooks/usePreventMessageNotifications';

import EmptyList from '../components/EmptyList';
import MenuSeparator from '../components/MenuSeparator';
import ResponsiveList from '../components/ResponsiveList';
import ChatLoader from '../components/contacts/ChatLoader';
import ChatBubble from '../components/contacts/ChatBubble';
import ChatTopNavigation from '../components/contacts/ChatTopNavigation';
import ChatInput from '../components/contacts/ChatInput';
import ChatSummary from '../components/contacts/ChatSummary';
import useGetChatMode from '../hooks/useGetChatMode';

const Chat = ({ route: { params: { id } }}) => {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();

  usePreventMessageNotifications(id);

  const { data, refetch: refetchChat } = useGetChat({
    variables: { id },
    fetchPolicy: "cache-and-network"
  });
  const chat = data?.viewer?.chat;

  const [ readChat ] = useReadChat();
  useEffect(() => {
    if (!chat) {
      return;
    }

    readChat({
      variables: {
        input: { chatId: chat.id }
      }
    })
  }, [chat?.updatedAt]);

  const messageActionCableParams = useMemo(() => ({
    channel: "MessageChannel",
    chatId: id
  }), [id]);
  const { data: messageChannelData } = useActionCableChannel(messageActionCableParams);

  useEffect(() => {
    if (messageChannelData?.action === 'updated') {
      readChat({
        variables: {
          input: { chatId: chat.id }
        }
      })
      refetchChat();
    }
  }, [messageChannelData]);

  const ListEmptyComponent = useCallback(() => (
    <EmptyList
      title={<ChatSummary chat={chat} />}
    />
  ), [chat]);

  const renderItem = useCallback(({ item }) => (
    <ChatBubble message={item} chatId={chat?.id} />
  ), [chat?.id]);

  const keyExtractor = useCallback(({ id }) => id, []);

  const { data: chatModeData } = useGetChatMode();
  const chatMode = chatModeData?.chatMode || "inline";

  const ContainerComponent = chatMode === 'inline' ? KeyboardAvoidingView : View;

  return (
    <View
      style={[ styles.root, { paddingBottom: bottom } ]}
    >
      <ChatTopNavigation chat={chat} />
      <Divider />
      {
        !chat && <ChatLoader />
      }
      {
        chat && (
          <ContainerComponent
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'android' ? '25' : '0'}
          >
            <View
              style={[ styles.messagesContainer, { backgroundColor: theme['background-basic-color-2'] }]}
            >
              <ResponsiveList
                ListFooterComponent={<MenuSeparator />}
                ListEmptyComponent={ListEmptyComponent}
                data={chat.messages}
                inverted={chat.messages.length > 0}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
              />
            </View>
            <ChatInput
              style={styles.inputContainer}
              chat={chat}
            />
          </ContainerComponent>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  inputContainer: {
    flexGrow: 0,
    flexShrink: 0,
    padding: 10,
  },
})

export default React.memo(Chat);
