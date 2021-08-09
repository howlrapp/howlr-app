import React, { useCallback, useRef, useState } from 'react';
import { Input, Icon, Button, Divider } from '@ui-kitten/components';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { trim, isEmpty } from 'lodash';
import Constants from 'expo-constants';

import { GET_CHAT } from '../../hooks/useGetChat';
import useViewer from '../../hooks/useViewer';
import useAddMessage from '../../hooks/useAddMessage';
import useAcceptChat from '../../hooks/useAcceptChat';
import usePickImage from '../../hooks/usePickImage';
import useGetChatMode from '../../hooks/useGetChatMode';

import showTransactionLoader from '../../utils/showTransactionLoader';
import FormModal from '../FormModal';

const ChatInput = ({
  chat,
  style
}) => {
  const { id: viewerId } = useViewer();

  const inputRef = useRef(null);
  const modalInputRef = useRef(null);

  const [ inputModalOpen, setInputModalOpen ] = useState(false);

  const handleOpenInputModal = useCallback(() => {
    setInputModalOpen(true);
  }, [setInputModalOpen]);

  const handleCloseInputModal = useCallback(() => {
    setInputModalOpen(false);
  }, [setInputModalOpen]);

  const [ addMessage, { loading: addMessageLoading } ] = useAddMessage({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GET_CHAT, variables: { id: chat.id } }]
  });

  const [ body, setBody ] = useState("");

  const handleChangeText = useCallback((value) => {
    setBody(value)
  }, []);

  const handleSendMessage = useCallback(async () => {
    await addMessage({ variables: { input: { chatId: chat.id, body: trim(body) }}});
    inputRef.current?.clear();
    setBody("");
    handleCloseInputModal();
  }, [body]);

  const [ acceptChat, { loading: acceptChatLoading } ] = useAcceptChat();
  const handleAcceptChat = useCallback(() => {
    Alert.alert(
      'Beware of scammers',
      'Never accept money or share any kind of personal information with someone you don\'t trust.',
      [
        {
          text: 'Understood',
          onPress: () => {
            acceptChat({
              variables: {
                input: { chatId: chat.id }
              }
            })
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        },
      ],
      { cancelable: true }
    );
  }, [acceptChat]);

  const pickImage = usePickImage();
  const handleAddImage = async () => {
    const { uri } = await pickImage({
      aspect: Constants.manifest.extra.picturesRatio,
      width: 1080,
    });

    if (uri) {
      handleCloseInputModal();

      showTransactionLoader({
        message: "Uploading picture"
      }, () => (
        addMessage({
          variables: {
            input: { chatId: chat.id, pictureUrl: uri }
          }
        })
      ));
    }
  }

  const renderAccessoryLeft = useCallback(({ style }) => {
    return (
      <TouchableOpacity
        onPress={handleAddImage}
        disabled={addMessageLoading}
        style={styles.accessory}
      >
        <Icon name="image-outline" style={style} />
      </TouchableOpacity>
    );
  }, [handleAddImage, addMessageLoading, body]);

  const renderAccessoryRight = useCallback(({ style }) => {
    const disabled = isEmpty(trim(body));

    return (
      <TouchableOpacity
        onPress={handleSendMessage}
        style={styles.accessory}
        disabled={addMessageLoading || disabled}
      >
        <Icon name={disabled ? "arrow-circle-up-outline" : "arrow-circle-up"} style={style} />
      </TouchableOpacity>
    );
  }, [addMessageLoading, handleSendMessage, body]);

  if (chat.contact.system) {
    return (
      <View
        style={style}
      >
        <Button
          disabled
          status="basic"
        >
          You cannot reply to this user
        </Button>
      </View>
    );
  }

  const { data } = useGetChatMode();
  const chatMode = data?.chatMode || "inline";

  return (
    <>
      <Divider />
      <View
        style={style}
      >
        {
          (chat.acceptedAt && chatMode === "inline") && (
            <Input
              ref={inputRef}
              disabled={addMessageLoading}
              onChangeText={handleChangeText}
              accessoryLeft={renderAccessoryLeft}
              accessoryRight={renderAccessoryRight}
              multiline
              placeholder="Write your message..."
            />
          )
        }
        {
          (chat.acceptedAt && chatMode === "modal") && (
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Button
                onPress={handleAddImage}
                style={{ flex: 1, marginRight: 5 }}
                appearance="outline"
                accessoryLeft={({ style }) => (
                  <Icon name="image-outline" style={style} />
                )}
                disabled={addMessageLoading}
              >
                Send image
              </Button>
              <Button
                onPress={handleOpenInputModal}
                style={{ flex: 1, marginLeft: 5 }}
                accessoryLeft={({ style }) => (
                  <Icon name="message-circle-outline" style={style} />
                )}
                disabled={addMessageLoading}
              >
                Send text
              </Button>
              <FormModal
                open={inputModalOpen}
                onCancel={handleCloseInputModal}
                onSave={handleSendMessage}
                saveLabel="Send"
                loading={addMessageLoading}
              >
                <Input
                  disabled={addMessageLoading}
                  onChangeText={handleChangeText}
                  multiline
                  placeholder="Write your message..."
                  ref={modalInputRef}
                  autoFocus={true}
                />
              </FormModal>
            </View>
          )
        }
        {
          (!chat.acceptedAt && chat.senderId === viewerId) && (
            <Button
              disabled
              status="basic"
              style={styles.button}
            >
              WAITING CONFIRMATION
            </Button>
          )
        }
        {
          (!chat.acceptedAt && chat.senderId !== viewerId) && (
            <Button
              status="success"
              disabled={acceptChatLoading}
              onPress={handleAcceptChat}
              style={styles.button}
            >
              ACCEPT CHAT
            </Button>
          )
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  accessory: {
    alignSelf: 'flex-end'
  },
  button: {
    marginBottom: 5,
  }
})

export default React.memo(ChatInput);
