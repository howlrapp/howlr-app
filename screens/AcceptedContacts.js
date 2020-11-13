import React, { useMemo } from 'react';

import useChats from '../hooks/useChats';

import Contacts from './Contacts';
import EmptyListSearch from '../components/EmptyListSearch';

const AcceptedContacts = () => {
  const chats = useChats();

  const filteredChats = useMemo(() => (
    chats.filter((chat) => chat.acceptedAt)
  ), [chats]);

  return (
    <Contacts
      chats={filteredChats}
      ListEmptyComponent={() => (
        <EmptyListSearch
          description="All accepted chat requests will show up here, don't be shy and go make some friends!"
        />
      )}
    />
  );
}

export default React.memo(AcceptedContacts);
