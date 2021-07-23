import React, { useCallback, useMemo } from 'react';
import { Card, Text, useTheme } from '@ui-kitten/components';
import { View, StyleSheet, Image } from 'react-native';
import { trim, isEmpty } from 'lodash';
import {
  useResponsiveScreenWidth,
} from "react-native-responsive-dimensions";
import { format, differenceInHours } from 'date-fns';
import { useActionSheet } from '@expo/react-native-action-sheet'
import FastImage from 'react-native-fast-image';

import ParsedText from 'react-native-parsed-text';
import * as WebBrowser from 'expo-web-browser';

import { GET_CHATS } from '../../hooks/useGetChats';
import { GET_CHAT } from '../../hooks/useGetChat';

import useViewer from '../../hooks/useViewer';
import useRemoveMessage from '../../hooks/useRemoveMessage';
import showTransactionMessage from '../../utils/showTransactionMessage';

const ChatBubble = React.memo(({
  message,
  chatId
}) => {
  const viewer = useViewer();
  const theme = useTheme();

  const isMe = message.senderId === viewer.id;

  const pictureSize = useResponsiveScreenWidth(67);

  const handleUrlPress = useCallback((url) => {
    WebBrowser.openBrowserAsync(url);
  }, []);

  const handleNamePress = useCallback((name) => {
    WebBrowser.openBrowserAsync(`https://t.me/${name.replace('@', '')}`);
  }, []);

  const date = useMemo(() => {
    const parsedCreatedAt = new Date(message.createdAt);

    if (differenceInHours(new Date(), parsedCreatedAt) < 24) {
      return (format(parsedCreatedAt, "HH:mm"));
    } else {
      return (format(parsedCreatedAt, "MMM. do  HH:mm"));
    }
  }, [message.createdAt]);

  const { showActionSheetWithOptions } = useActionSheet();
  const [ removeMessage ] = useRemoveMessage();
  const handleShowOptions = useCallback(() => {
    showActionSheetWithOptions(
      {
        options: ['Delete message', 'Cancel'],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
        title: "Select action",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          showTransactionMessage(
            { message: "Deleting message" },
            () => (
              removeMessage({
                variables: {
                  input: { messageId: message.id }
                },
                awaitRefetchQueries: true,
                refetchQueries: [
                  { query: GET_CHATS },
                  { query: GET_CHAT, variables: { id: chatId } }
                ]
              })
            )
          );
        }
      }
    )
  }, [showActionSheetWithOptions, message, chatId, removeMessage ]);

  return (
    <>
      {
        !isEmpty(message.body) && (
          <View
            style={isMe ? styles.bubbleContainerRight : styles.bubbleContainerLeft}
          >
            <Card
              appearance="filled"
              style={[
                styles.bubble,
                { backgroundColor: isMe ? theme['color-primary-600'] : theme['color-basic-transparent-100'] }
              ]}
              onLongPress={handleShowOptions}
            >
              <Text
                category="p1"
                style={isMe ? { color: theme['color-basic-100'] } : {}}
              >
                <ParsedText
                  parse={[
                    { type: 'url', style: styles.url, onPress: handleUrlPress },
                    { pattern: /@[a-z0-9_]{5,32}/i, style: styles.username, onPress: handleNamePress },

                  ]}
                >
                  {trim(message.body)}
                </ParsedText>
              </Text>
              <Text
                style={[ styles.date, isMe ? { color: theme['color-basic-100'] } : {} ]}
                category="c1"
              >
                {date}
              </Text>
            </Card>
          </View>
        )
      }
      {
        message.pictureUrl && (
          <View
            style={isMe ? styles.bubbleContainerRight : styles.bubbleContainerLeft}
          >
            <View
              style={[
                styles.placeholderStyle,
                {
                  width: pictureSize,
                  height: pictureSize,
                  backgroundColor: theme['background-basic-color-4'],
                  borderRadius: 5,
                }
              ]}
            />
            <FastImage
              style={{
                width: pictureSize,
                height: pictureSize,
                borderRadius: 5
              }}
              source={{
                uri: message.pictureUrl,
              }}
            />
          </View>
        )
      }
    </>
  )
});

const styles = StyleSheet.create({
  bubbleContainerRight: {
    flexDirection: 'row',
    paddingBottom: 5,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
  },
  bubbleContainerLeft: {
    flexDirection: 'row',
    paddingBottom: 5,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '67%',
    minWidth: 140,
    paddingBottom: 5
  },
  placeholderStyle: {
    position: 'absolute'
  },
  url: {
    textDecorationLine: 'underline',
  },
  username: {
    fontWeight: 'bold'
  },
  date: {
    textAlign: 'right',
    position: 'absolute',
    bottom: 1,
    right: 10,
    opacity: 0.6,
    fontSize: 10,
  }
})

export default React.memo(ChatBubble);
