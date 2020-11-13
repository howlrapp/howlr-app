import React from 'react';
import { MenuItem } from '@ui-kitten/components';
import { Alert } from 'react-native';

import useDeleteToken from '../../hooks/useDeleteToken';
import useApp from '../../hooks/useApp';
import useRemoveSession from '../../hooks/useRemoveSession';
import showTransactionMessage from '../../utils/showTransactionMessage';

const LogoutLink = () => {
  const [ deleteToken ] = useDeleteToken();

  const { accountRemovalMonthsCount } = useApp();
  const [ removeSession ] = useRemoveSession();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      `You can log back at any time. If you don't your account will be automatically removed after ${accountRemovalMonthsCount} months.`,
      [
        {
          text: 'Confirm',
          onPress: async () => {
            await showTransactionMessage({
              message: "Deleting session"
            }, () => (
              removeSession({
                variables: {
                  input: {}
                }
              })
            ));
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
      title="Logout"
      onPress={handleLogout}
    />
  );
}

export default React.memo(LogoutLink);
