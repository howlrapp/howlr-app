import React, { useState, useCallback, useMemo } from 'react';
import {
  Text,
  Divider,
  Button,
  useTheme
} from '@ui-kitten/components';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { differenceInDays } from 'date-fns'

import useViewer from '../../hooks/useViewer';

import UserListAvatar from '../UserListAvatar';
import EventUsersModal from './EventUsersModal';
import EventItemHeader from './EventItemHeader';
import EventPresenceCheckbox from './EventPresenceCheckbox';

const EventItem = ({ event }) => {
  const theme = useTheme();

  const viewer = useViewer();

  const [ usersModalOpen, setUsersModalOpen ] = useState(false);

  const handleOpenUsersModal = useCallback(() => {
    setUsersModalOpen(true)
  }, [setUsersModalOpen])

  const handleCloseUsersModal = useCallback(() => {
    setUsersModalOpen(false)
  }, [setUsersModalOpen])

  const joined = useMemo(() => (
    event.users.some(({ id }) => id === viewer.id)
  ), [event, viewer.id])

  const participantsSentence = useMemo(() => {
    if (event.users.length > 1) {
      return (`${event.users.length} people going`);
    }
    if (event.users.length === 1) {
      return ("One person going");
    }

    return("No participant");
  }, [event.users]);

  const pastEvent = useMemo(() => (
    differenceInDays(new Date(event.date), new Date()) < 0
  ), [event.date])

  return (
    <View
      style={[ styles.root, { borderColor: theme['border-basic-color-3'], backgroundColor: theme['background-basic-color-1'] } ]}
    >
      <EventItemHeader event={event} />

      <Button
        appearance="outline"
        size="tiny"
        style={styles.seeMoreButton}
        status="basic"
        onPress={handleOpenUsersModal}
      >
        See more
      </Button>

      <Divider />

      <View
        style={styles.footer}
      >
        <TouchableOpacity
          onPress={handleOpenUsersModal}
        >
        <View
            style={styles.participantsList}
          >
            <UserListAvatar
              users={event.users}
              style={styles.userListAvatar}
              last={joined ? viewer : null}
            />
            <Text category="p2" appearance="hint">
              {participantsSentence}
            </Text>
          </View>
        </TouchableOpacity>
        {
          pastEvent && (
            <Text category="c1" appearance="hint">Past event</Text>
          )
        }
        {
          !pastEvent && (event.user.id === viewer.id) && (
            <Text category="c1" appearance="hint">Your event</Text>
          )
        }
        {
          !pastEvent && (event.user.id !== viewer.id) && (
            <EventPresenceCheckbox event={event} />
          )
        }
      </View>
      <EventUsersModal
        open={usersModalOpen}
        event={event}
        onClose={handleCloseUsersModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 44,
  },
  participantsList: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userListAvatar: {
    paddingRight: 10,
  },
  seeMoreButton: {
    marginHorizontal: 10,
    marginBottom: 10,
  }
})

export default React.memo(EventItem);
