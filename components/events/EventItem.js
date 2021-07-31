import React, { useCallback, useMemo } from 'react';
import {
  Text,
  Button,
  Card,
} from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { DEFAULT_USERS_SEARCH_CRITERIA } from '../../graphql/apolloClient';

import useRandomColor from '../../hooks/useRandomColor';

import EventItemDate from './EventItemDate';
import useApp from '../../hooks/useApp';
import { useNavigation } from '@react-navigation/native';
import useSetUsersSearchCriteria from '../../hooks/useSetUsersSearchCriteria';

export const attendeesCountAsWords = (count) => {
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

  const [ setUsersSearchCriteria ] = useSetUsersSearchCriteria();
  const handleSeeAttendees = useCallback(async () => {
    await setUsersSearchCriteria({
      variables: {
        usersSearchCriteria: {
          ...DEFAULT_USERS_SEARCH_CRITERIA,
          eventIds: [event.id]
        }
      }
    });
    navigation.navigate("Users");
  }, [event.id, setUsersSearchCriteria]);

  const handlePress = useCallback(() => {
    navigation.navigate('Event', { id: event.id })
  }, [event.id]);

  return (
    <>
      <Card
        disabled
        header={({ style }) => (
          <View style={[ ...style, styles.header ]}>
            <View style={{ flex: 1 }}>
              <Text category="h6" style={{ flex: 1 }} numberOfLines={1}>
                {event.title}
              </Text>
              <Text category="s1" style={{ flex: 1, color: backgroundColor }}>
                {eventCategory.label}
              </Text>
            </View>
            <EventItemDate event={event} />
          </View>

        )}
        footer={({ style }) => (
          <View
            style={[ style, styles.footer ]}
          >
            <TouchableOpacity
              onPress={handleSeeAttendees}
              style={styles.participantsList}
            >
              <Text category="p2" appearance="hint">
                {attendeesCountAsWords(event.usersCount)}
              </Text>
            </TouchableOpacity>
            <Button
              size="small"
              onPress={handlePress}
            >
              See more
            </Button>
          </View>
        )}
      >
        {
          <Text
            category="p2"
          >
            {event.address}
          </Text>
        }
      </Card>
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
  }
})

export default React.memo(EventItem);
