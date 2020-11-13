import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { Text, ListItem, TopNavigation, Divider } from '@ui-kitten/components';
import { StyleSheet, Platform, View, TouchableOpacity } from 'react-native';
import { Portal } from 'react-native-portalize';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { orderBy } from 'lodash';
import { differenceInDays } from 'date-fns'

import useViewer from '../../hooks/useViewer';

import ResponsiveModalize from '../ResponsiveModalize';
import UserAvatar from '../UserAvatar';
import EventItemHeader from './EventItemHeader';
import EventItemBody from './EventItemBody';
import EventPresenceCheckbox from './EventPresenceCheckbox';

const EventTopNavigation = ({
  event,
  onClose,
  ...props
}) => {
  const viewer = useViewer();

  const joined = useMemo(() => (
    event.users.some(({ id }) => id === viewer.id)
  ), [event, viewer.id]);

  const pastEvent = useMemo(() => (
    differenceInDays(new Date(event.date), new Date()) < 0
  ), [event.date])

  const accessoryLeft = useCallback(() => {
    return (
      <TouchableOpacity
        onPress={onClose}
      >
        <Text
          status="info"
          category="p1"
          style={[ styles.buttonText, styles.actionLeft ]}
        >
          Close
        </Text>
      </TouchableOpacity>
    );
  }, [onClose])

  const accessoryRight = useCallback(() => {
    if (pastEvent) {
      return (
        <Text category="s2" appearance="hint">Past event</Text>
      );
    }

    if (!pastEvent && (event.user.id === viewer.id)) {
      return (
        <Text category="s2" appearance="hint">Your event</Text>
      )
    }

    return (
      <EventPresenceCheckbox event={event} />
    );
  }, [joined, pastEvent])

  return (
    <TopNavigation
      style={styles.listItem}
      accessoryLeft={accessoryLeft}
      accessoryRight={accessoryRight}
      alignment="center"
      {...props}
    />
  )
}

const EventUsersModal = ({
  event,
  open,
  onClose,
  ...props
}) => {
  const navigation = useNavigation();

  const modalizeRef = useRef();

  const sortedUsers = useMemo(() => (
    orderBy(event.users, ({ id }) => id !== event.user.id)
  ), [event.users]);

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

  const ListHeaderComponent = useCallback(() => (
    <>
      <EventTopNavigation event={event} onClose={onClose} />
      <EventItemHeader event={event} />
      <EventItemBody event={event} />
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

  return (
    <Portal>
      <ResponsiveModalize
        ref={modalizeRef}
        withHandle={true}
        panGestureEnabled={true}
        disableScrollIfPossible={false}
        keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        flatListProps={flatListProps}
        modalTopOffset={20}
        onClose={onClose}
        {...props}
      />
    </Portal>
  );
}

const styles = StyleSheet.create({
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
