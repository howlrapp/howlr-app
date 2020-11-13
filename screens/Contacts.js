import React, { useMemo, useCallback } from 'react';
import { Divider } from '@ui-kitten/components';
import { useLazyQuery } from '@apollo/client';

import { GET_CHATS } from '../hooks/useGetChats';

import ContactItem from '../components/contacts/ContactItem';
import ResponsiveList from '../components/ResponsiveList';

const Contacts = ({ chats, ...props }) => {
  const sortedChats = useMemo(() => (
    chats.sort((chat1, chat2) => (new Date(chat1.updatedAt) - new Date(chat2.updatedAt))).reverse()
  ), [chats]);

  const getItemLayout = useCallback((_data, index) => ({
    length: 55, offset: index * 55, index
  }), []);

  const renderItem = useCallback(({ item }) => (
    <ContactItem chat={item} />
  ), [])

  const [ refreshChats, { loading } ] = useLazyQuery(GET_CHATS, { fetchPolicy: "network-only" });
  const handleRefresh = useCallback(() => {
    refreshChats();
  }, [refreshChats]);

  return (
    <ResponsiveList
      initialNumToRender={20}
      getItemLayout={getItemLayout}
      data={sortedChats}
      ItemSeparatorComponent={Divider}
      keyExtractor={(chat) => chat.id}
      renderItem={renderItem}
      onRefresh={handleRefresh}
      refreshing={loading}
      {...props}
    />
  );
}

export default React.memo(Contacts);
