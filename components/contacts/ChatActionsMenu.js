import React, { useCallback, useState } from 'react';
import { MenuItem, TopNavigationAction, Icon } from '@ui-kitten/components';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import useRemoveChat from '../../hooks/useRemoveChat';
import useClearChat from '../../hooks/useClearChat';
import { GET_CHATS } from '../../hooks/useGetChats';

import useGetChatMode from '../../hooks/useGetChatMode';
import useSetChatMode from '../../hooks/useSetChatMode';

import showTransactionLoader from '../../utils/showTransactionLoader';

import ThemedOverflowMenu from '../ThemedOverflowMenu';

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical' />
);

const ChatActionsMenu = ({
  chat,
}) => {
  const navigation = useNavigation();

  const { data: chatModeData } = useGetChatMode();
  const chatMode = chatModeData?.chatMode || "inline";

  const [ setChatMode, { loading } ] = useSetChatMode();
  const handleSwitchToModalMode = useCallback(() => {
    setChatMode({ variables: { chatMode: 'modal' }});
    setMenuOpen(false);
  }, [setChatMode, setMenuOpen]);

  const handleSwitchToInlineMode = useCallback(() => {
    setChatMode({ variables: { chatMode: 'inline' }});
    setMenuOpen(false);
  }, [setChatMode, setMenuOpen]);

  const [ menuOpen, setMenuOpen ] = useState(false);

  const handleOpenMenu = useCallback(() => {
    setMenuOpen(true);
  }, [setMenuOpen]);

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

  const [ removeChat ] = useRemoveChat();
  const handleRemoveChat = useCallback(() => {
    setMenuOpen(false);

    Alert.alert(
      'Delete chat',
      'This operation cannot be undone. All messages will be permanently deleted.',
      [
        {
          text: 'Confirm deletion',
          style: 'destructive',
          onPress: async () => {
            await showTransactionLoader(() => (
                removeChat({
                  variables: {
                    input: { chatId: chat.id }
                  },
                  awaitRefetchQueries: true,
                  refetchQueries: [{ query: GET_CHATS }]
                })
              )
            );
            navigation.goBack();
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        },
      ],
      { cancelable: true }
    );
  }, [chat]);

  const [ clearChat ] = useClearChat();
  const handleClearChat = useCallback(() => {
    setMenuOpen(false);

    Alert.alert(
      'Clear chat',
      'This operation cannot be undone. All messages will be permanently deleted.',
      [
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => {
            showTransactionLoader(() => (
                clearChat({
                  variables: {
                    input: { chatId: chat.id }
                  },
                  awaitRefetchQueries: true,
                  refetchQueries: [{ query: GET_CHATS }]
                })
              )
            );
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        },
      ],
      { cancelable: true }
    );
  }, [chat]);

  const renderMenuAction = useCallback(() => (
    <TopNavigationAction icon={MenuIcon} onPress={handleOpenMenu}/>
  ), []);

  return (
    <>
      <ThemedOverflowMenu
        anchor={renderMenuAction}
        visible={menuOpen}
        onBackdropPress={handleCloseMenu}
      >
        {
          chatMode === 'inline' && (
            <MenuItem
              title='Switch to Modal'
              onPress={handleSwitchToModalMode}
          />
          )
        }
        {
          chatMode === 'modal' && (
            <MenuItem
              title='Switch to Inline'
              onPress={handleSwitchToInlineMode}
          />
          )
        }
        <MenuItem
          title='Clear chat'
          onPress={handleClearChat}
        />
        <MenuItem
          title='Delete chat'
          onPress={handleRemoveChat}
        />
      </ThemedOverflowMenu>
    </>
  );
}

export default React.memo(ChatActionsMenu);
