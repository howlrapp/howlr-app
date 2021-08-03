import React, { useEffect, useCallback, useMemo, useState, useRef } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import { Divider, Input, Text, useTheme } from '@ui-kitten/components';
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
import FormModal from '../components/FormModal';

const ChatMessageList = ({ chat }) => {
  const ListEmptyComponent = useCallback(() => (
    <EmptyList
      title={<ChatSummary chat={chat} />}
    />
  ), [chat]);

  const renderItem = useCallback(({ item }) => (
    <ChatBubble message={item} chatId={chat?.id} />
  ), [chat?.id]);

  const keyExtractor = useCallback(({ id }) => id, []);
  return (
    <ResponsiveList
      ListFooterComponent={<MenuSeparator />}
      ListEmptyComponent={ListEmptyComponent}
      data={chat.messages}
      inverted={chat.messages.length > 0}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  )
}

const ChatContainer = ({ chat }) => {
  const theme = useTheme();

  const [ hideMessages, setHideMessages ] = useState(false);


  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior='height'
    >
      {
        (!hideMessages || Platform.OS === 'ios') && (
          <View
            style={[ styles.messagesContainer, { backgroundColor: theme['background-basic-color-2'] }]}
          >
            <ChatMessageList chat={chat} />
          </View>
        )
      }
      <ChatInput
        style={styles.inputContainer}
        chat={chat}
      />
    </KeyboardAvoidingView>
  );
}

const Chat = ({ route: { params: { id } }}) => {
  const { bottom } = useSafeAreaInsets();

  usePreventMessageNotifications(id);

  const { data, refetch: refetchChat } = useGetChat({ variables: { id }, fetchPolicy: "cache-and-network" });
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
        chat && <ChatContainer chat={chat} />
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
    paddingBottom: 60
  },
  inputContainer: {
    flexGrow: 0,
    flexShrink: 0,
    padding: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
})

export default React.memo(Chat);
