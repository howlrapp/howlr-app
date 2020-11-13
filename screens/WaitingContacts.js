import React, { useMemo } from 'react';

import useChats from '../hooks/useChats';

import Contacts from './Contacts';
import EmptyListGroups from '../components/EmptyListGroups';

const WaitingContacts = () => {
  const chats = useChats();

  const filteredChats = useMemo(() => (
    chats.filter((chat) => !chat.acceptedAt)
  ), [chats]);

  return (
    <Contacts
      chats={filteredChats}
      ListEmptyComponent={() => (
        <EmptyListGroups
          description="You don't have any chat requests waiting to be accepted. Join groups that match your interest to get more chat requests."
        />
      )}
     />
  );
}

export default React.memo(WaitingContacts);
