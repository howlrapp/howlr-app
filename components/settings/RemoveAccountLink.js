import React from 'react';
import { MenuItem, Text, useTheme } from '@ui-kitten/components';
import { Alert } from 'react-native';

import useDeleteToken from '../../hooks/useDeleteToken';
import useRemoveAccount from '../../hooks/useRemoveAccount';

const RemoveAccountLink = () => {
  const theme = useTheme();

  const [ deleteToken ] = useDeleteToken();
  const [ removeAccount ] = useRemoveAccount();

  const handleLogout = () => {
    Alert.alert(
      'Remove your account',
      'This operation cannot be undone. All you personal information, likes and chats will be deleted.',
      [
        {
          text: 'Confirm deletion',
          style: 'destructive',
          onPress: async () => {
            await removeAccount({ variables: { input: {} }});
            deleteToken();
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <MenuItem
      title={({ style, ...props }) => (
        <Text
          {...props}
          style={[ style, { color: theme['color-danger-500'] } ]}
        >
          Remove your account
        </Text>
      )}
      onPress={handleLogout}
    />
  );
}

export default React.memo(RemoveAccountLink);
