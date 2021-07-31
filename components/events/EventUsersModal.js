import React, { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import { Text, ListItem, Divider } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { format } from "date-fns";
import { useNavigation } from '@react-navigation/native';

import ResponsiveModalize from '../ResponsiveModalize';
import UserAvatar from '../UserAvatar';
import EventForm from './EventForm';
import EventItemBody from './EventItemBody';
import EventPresenceCheckbox from './EventPresenceCheckbox';
import FormTopNavigation from '../FormTopNavigation';

const EventUsersModal = ({
  event,
  open,
  onClose,
  ...props
}) => {
  const navigation = useNavigation();

  const modalizeRef = useRef();

  const sortedUsers = useMemo(() => (
    [event.user].concat(event.users.filter(({ id }) => id !== event.user.id))
  ), [event.user, event.users]);

  useEffect(() => {
    if (open) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [open])

  const renderItem = useCallback(({ item }) => (
    <ListItem
      style={styles.listItem}
      onPress={() => navigation.navigate('User', { id: item.id })}
      title={(props) => (
        <View style={styles.item}>
          <Text {...props}>{item.name}</Text>
          {item.id === event.user.id ? <Text category="c1" appearance="hint">Event organizer</Text> : null}
        </View>
      )}
      accessoryLeft={({ style: { height } }) => (
        <UserAvatar user={item} size={height} />
      )}
    />
  ), [event.user.id]);

  const keyExtractor = useCallback(({ id }) => id, []);

  const { bottom, left, right } = useSafeAreaInsets();

  const [ editFormOpen, setEditFormOpen ] = useState(false);

  const handleOpenEditForm = useCallback(() => {
    setEditFormOpen(true)
  });

  const handleCloseEditForm = useCallback(() => {
    setEditFormOpen(false);
  })

  const ListHeaderComponent = useCallback(() => (
    <>
      <FormTopNavigation
        title={({ style }) => (
          <View
            style={styles.topNavigationTitle}
          >
            <Text style={style}>{event.title}</Text>
            <Text category="c2" appearance="hint">
              {format(new Date(event.date), 'PP')}
            </Text>
          </View>

        )}
        cancelLabel="Close"
        onCancel={onClose}
        saveLabel="Edit"
        onSave={handleOpenEditForm}
      />
      <EventItemBody event={event} />
      <EventPresenceCheckbox event={event} />
      <Divider />
      <Text
        category="c2"
        appearance="hint"
        style={styles.listHeader}
       >
         PARTICIPANTS
       </Text>

    </>
  ), [event]);

  const flatListProps = useMemo(() => ({
    data: sortedUsers,
    renderItem,
    keyExtractor,
    ListHeaderComponent,
    contentContainerStyle: {
      paddingBottom: bottom + 20,
      paddingLeft: left,
      paddingRight: right,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      overflow: 'hidden',
    }
  }), [sortedUsers, renderItem, bottom, left, right]);

  if (editFormOpen) {
    return (
      <EventForm
        event={event}
        open={true}
        onCancel={handleCloseEditForm}
        onSave={handleCloseEditForm}
        title="Edit event"
      />
    )
  }

  return (
    <Portal>
      <ResponsiveModalize
        ref={modalizeRef}
        withHandle={false}
        panGestureEnabled={true}
        disableScrollIfPossible={false}
        keyboardAvoidingBehavior={'padding'}
        flatListProps={flatListProps}
        onClose={onClose}
        {...props}
      />
    </Portal>
  );
}

const styles = StyleSheet.create({
  topNavigationTitle: {
    alignItems: 'center'
  },
  listItem: {
    backgroundColor: "transparent",
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    backgroundColor: 'transparent'
  },
  listHeader: {
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 10,
  }
})

export default EventUsersModal;
