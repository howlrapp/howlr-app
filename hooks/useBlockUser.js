import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import useViewer from './useViewer';
import { GET_VIEWER } from './useGetViewer';
import { GET_LIKES } from './useGetLikes';
import { GET_CHATS } from './useGetChats';
import useUpdateViewer from './useUpdateViewer';

import showTransactionLoader from '../utils/showTransactionLoader';

const useBlockUser = () => {
  const navigation = useNavigation();

  const { blockedUsers } = useViewer();
  const [ updateViewer ] = useUpdateViewer();

  const blockUser = useCallback(async (id) => {
    await showTransactionLoader(() => (
      updateViewer({
        variables: {
          input: {
            blockedUsersIds: [ ...blockedUsers.map(({ id }) => id), id ]
          }
        },
        refetchQueries: [
          { query: GET_VIEWER },
          { query: GET_CHATS },
          { query: GET_LIKES },
        ],
        awaitRefetchQueries: true,
      })
    ));
    navigation.goBack();
  }, [
    blockedUsers,
    updateViewer,
    navigation,
  ]);

  return (blockUser);
}

export default useBlockUser;
