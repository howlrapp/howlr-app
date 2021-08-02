import React, { useCallback, useMemo, useState } from 'react';
import {
  Text,
  Button,
  Card,
} from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { truncate } from 'lodash';

import useRandomColor from '../../hooks/useRandomColor';

import EventItemDate from './EventItemDate';
import EventUsersModal from './EventUsersModal';
import useApp from '../../hooks/useApp';
import { useNavigation } from '@react-navigation/native';
import useViewer from '../../hooks/useViewer';
import EnrichedText from '../EnrichedText';

export const attendeesCountAsWords = (count, joined) => {
  if (joined) {
    if (count > 1) {
      return (`You and ${count - 1} other going`);
    }
    if (count === 1) {
      return ("You are going");
    }
  
    // shouldn't happen
    return("No attendees");
  }

  if (count > 1) {
    return (`${count} going`);
  }
  if (count === 1) {
    return ("One going");
  }

  return("No attendees");
}

const EventItem = ({ event }) => {
  const { eventCategories } = useApp();

  const eventCategory = useMemo(() => (
    eventCategories.find(({ id }) => id === event.eventCategoryId)
  ), [event, eventCategories]);

  const backgroundColor = useRandomColor(event.eventCategoryId);

  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    navigation.navigate('Event', { id: event.id })
  }, [event.id]);

  const [ eventUsersModalOpen, setEventUsersModalOpen ] = useState(false);

  const handleOpenEventUsersModal = useCallback(() => {
    setEventUsersModalOpen(true);
  }, [setEventUsersModalOpen]);

  const handleCloseEventUsersModal = useCallback(() => {
    setEventUsersModalOpen(false);
  }, [setEventUsersModalOpen]);

  const { eventsAsParticipant } = useViewer();
  const joined = useMemo(() => (
    eventsAsParticipant.some(({ id }) => id === event.id)
  ), [eventsAsParticipant, event]);

  const noAttendees = event.usersCount === 0;

  return (
    <>
      <Card
        disabled
        header={({ style }) => (
          <TouchableOpacity
            style={[ ...style, styles.header ]}
            onPress={handlePress}
          >
            <View style={{ flex: 1 }}>
              <Text category="h6" style={{ flex: 1 }} numberOfLines={1}>
                {event.title}
              </Text>
              <Text category="c2" style={{ flex: 1, color: backgroundColor }}>
                {eventCategory?.label?.toUpperCase()}
              </Text>
            </View>
            <EventItemDate event={event} />
          </TouchableOpacity>
        )}
        footer={({ style }) => (
          <View
            style={[ style, styles.footer ]}
          >
            <TouchableOpacity
              onPress={handleOpenEventUsersModal}
              style={styles.participantsList}
              disabled={noAttendees}
            >
              <Text
                category="c2"
                style={noAttendees ? {} : { textDecorationLine: 'underline'}}
                appearance={noAttendees ? 'hint' : 'default'}
              >
                {attendeesCountAsWords(event.usersCount, joined).toUpperCase()}
              </Text>
            </TouchableOpacity>
            <Button
              size="small"
              onPress={handlePress}
              appearance="outline"
            >
              See more
            </Button>
          </View>
        )}
      >
        <TouchableOpacity
          onPress={handlePress}
        >
          <Text
            category="p2"
          >
            {event.address}
          </Text>
          <Text
            appearance="hint"
            category="p2"
            style={styles.description}
            numberOfLines={2}
          >
            {event.description}
          </Text>
        </TouchableOpacity>
      </Card>
      <EventUsersModal
        event={event}
        open={eventUsersModalOpen}
        onClose={handleCloseEventUsersModal}
      />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantsList: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userListAvatar: {
    paddingRight: 10,
  },
  description: {
    marginTop: 6,
  }
})

export default React.memo(EventItem);
