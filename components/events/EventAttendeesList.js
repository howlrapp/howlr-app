import React, { useCallback, useMemo } from 'react';
import { Text, ListItem, List } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import UserAvatar from '../UserAvatar';
import useGetUserSummaries from '../../hooks/useGetUserSummaries';
import { useNavigation } from '@react-navigation/native';

const EventAttendeesListItem = ({ userId, item }) => {
  const navigation = useNavigation();

  const handleGoToUser = useCallback((user) => {
    navigation.navigate('User', { id: user.id });
  }, [navigation]);

  return (
    <ListItem
      style={styles.listItem}
      onPress={() => handleGoToUser(item)}
      title={(props) => (
        <View style={styles.item}>
          <Text {...props}>{item.name}</Text>
          {item.id === userId ? <Text category="c1" appearance="hint">Event organizer</Text> : null}
        </View>
      )}
      accessoryLeft={({ style: { height } }) => (
        <UserAvatar user={item} size={height} />
      )}
    />
  );
}

const EventAttendeesList = ({
  event,
  skip,
  ...props
}) => {
  const { data: usersData } = useGetUserSummaries({
    variables: {
      eventIds: [event?.id]
    },
    skip
  });
  const users = usersData?.viewer?.userSummaries || [];

  const sortedUsers = useMemo(() => {
    if (!event) {
      return [];
    }

    return (
      [event.user].concat(users.filter(({ id }) => id !== event.user.id))
    );
  }, [event?.user, users]);

  const renderItem = useCallback(({ item }) => (
    <EventAttendeesListItem item={item} userId={event?.user?.id} />
  ), [event?.user?.id]);

  const keyExtractor = useCallback(({ id }) => id, []);

  const ListEmptyComponent = useCallback(() => (
    <Text
      appearance="hint"
      category="c2"
      style={styles.emptyListMessage}
    >
      No visible attendees
    </Text>
  ), []);

  return (
    <List
      data={sortedUsers}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      keyExtractor={keyExtractor}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyListMessage: {
    marginTop: 25,
    textAlign: 'center'
  },
  listItem: {
    paddingHorizontal: 0
  }
})

export default React.memo(EventAttendeesList);
