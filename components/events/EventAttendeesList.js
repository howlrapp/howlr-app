import React, { useCallback, useMemo } from 'react';
import { Text, ListItem, List } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { times, compact } from 'lodash';

import UserAvatar from '../UserAvatar';
import { useNavigation } from '@react-navigation/native';
import ThemedContentLoader from '../ThemedContentLoader';
import useViewer from '../../hooks/useViewer';

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
  users,
  loading,
  ...props
}) => {
  const viewer = useViewer();

  const joined = useMemo(() => (
    viewer.eventsAsParticipant.some(({ id }) => id === event.id)
  ), [viewer.eventsAsParticipant, event]);

  const sortedUsers = useMemo(() => (
    compact([event.user.system ? null : event.user, joined ? viewer : null ])
    .concat(
      users.filter(({ id }) => (
        id !== event.user.id && id !== viewer.id
      ))
    )
  ), [event.user, users, viewer]);

  const renderItem = useCallback(({ item }) => (
    <EventAttendeesListItem item={item} userId={event.user.id} />
  ), [event.user.id]);

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

  if (loading) {
    return (
      times(7, (index) => (
        <ThemedContentLoader
          key={index}
          index={index}
          active
          avatar
          pRows={0}
          tWidth={'100%'}
          tHeight={30}
          aSize={30}
          containerStyles={{
            paddingHorizontal: 0,
            paddingVertical: 10,
          }}
        />
      ))
    );
  }

  return (
    <List
      data={sortedUsers}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      keyExtractor={keyExtractor}
      refreshing={true}
      style={styles.listStyle}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  listStyle: {
    backgroundColor: 'transparent'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyListMessage: {
    marginVertical: 25,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  listItem: {
    paddingHorizontal: 0
  },
  spinnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40
  }
})

export default React.memo(EventAttendeesList);
