import React, { useMemo, useCallback } from 'react';
import { orderBy } from 'lodash';

import useViewer from '../../hooks/useViewer';
import useUpdateViewer from '../../hooks/useUpdateViewer';

import MenuItemFormMultipleChoice from '../MenuItemFormMultipleChoice';

import { GET_VIEWER } from '../../hooks/useGetViewer';
import { GET_LIKES } from '../../hooks/useGetLikes';
import { GET_CHATS } from '../../hooks/useGetChats';

const BlockedUsersForm = (props) => {
 const viewer = useViewer();
  const [ updateViewer, { loading } ] = useUpdateViewer();

 const sortedBlockedUsers = useMemo(() => (
   orderBy(viewer.blockedUsers, 'name')
 ), [viewer.blockedUsers]);

  const options = useMemo(() => (
    sortedBlockedUsers.map(({ id, name }) => ({ value: id, label: name }))
  ), [sortedBlockedUsers]);

  const initialValue = useMemo(() => (
    sortedBlockedUsers.map(({ id }) => id)
  ), [sortedBlockedUsers]);

  const handleSave = useCallback((value) => (
    updateViewer({
      variables: {
        input: {
          blockedUsersIds: value
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

  return (
    <MenuItemFormMultipleChoice
      title="Blocked users"
      description="Do you want to give them a second chance? Uncheck any user you want to unblock."
      options={options}
      initialValue={initialValue}
      onSave={handleSave}
      disabled={options.length === 0}
      loading={loading}
      {...props}
    />
  );
}

export default React.memo(BlockedUsersForm);
