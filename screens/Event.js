import React, { useMemo, useState, useCallback } from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';
import { Button, Icon, useTheme } from '@ui-kitten/components';

import ScreenTopNavigation from '../components/ScreenTopNavigation';
import useGetEvent from '../hooks/useGetEvent';
import useApp from '../hooks/useApp';

import { DEFAULT_USERS_SEARCH_CRITERIA } from '../graphql/apolloClient';
import useSetUsersSearchCriteria from '../hooks/useSetUsersSearchCriteria';

import EventActionsMenu from '../components/events/EventActionsMenu';
import EventLoader from '../components/events/EventLoader';
import EventHeader from '../components/events/EventHeader';
import EventProfileNoteAddress from '../components/events/EventProfileNoteAddress';
import EventProfileNotePrivacyStatus from '../components/events/EventProfileNotePrivacyStatus';
import EventProfileNoteDate from '../components/events/EventProfileNoteDate';
import EventProfileItemDescription from '../components/events/EventProfileItemDescription';
import { useNavigation } from '@react-navigation/native';

import { attendeesCountAsWords } from '../components/events/EventItem';

const Event = ({ route: { params: { id } }}) => {
  const { data: eventData } = useGetEvent({
    variables: { id }
  });
  const event = eventData?.viewer?.event;

  const { eventCategories } = useApp();

  const eventCategory = useMemo(() => (
    eventCategories.find(({ id }) => id === event?.eventCategoryId)
  ), [event, eventCategories]);

  const theme = useTheme();

  const [ scrollY ] = useState(new Animated.Value(0));

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
  }, [event?.id, setUsersSearchCriteria]);

  const navigationDefaultTitleOpacity =
    scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

  const navigationUserNameTitleOpacity =
    scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

  return (
    <>
      <ScreenTopNavigation
        title={({ style, ...props }) => {
          return (
            <>
              <Animated.Text
                style={[ style, styles.headerAnimatedItems, { opacity: navigationDefaultTitleOpacity }]}
                {...props}
              >
                {eventCategory?.label}
              </Animated.Text>
              <Animated.Text
                style={[ styles.headerAnimatedItems, { opacity: navigationUserNameTitleOpacity }]}
                {...props}
              >
                {event?.title}
              </Animated.Text>
            </>
          )
        }}
        accessoryRight={() => event ? <EventActionsMenu event={event} /> : null}
      />
      <Animated.ScrollView
        contentContainerStyle={Platform.OS === 'ios' ? {} : styles.scrollViewContentContainerStyle}
        contentInsetAdjustmentBehavior="automatic"
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {
          event ? (
            <>
              <View
                style={styles.headerRoot}
              >
                <EventHeader event={event} />
                <View
                  style={styles.headerAboutSummary}
                >
                  <EventProfileNoteDate
                    event={event}
                    style={styles.headerAboutSummaryItem}
                  />
                  <EventProfileNoteAddress
                    event={event}
                    style={styles.headerAboutSummaryItem}
                  />
                  <EventProfileNotePrivacyStatus
                    event={event}
                    style={styles.headerAboutSummaryItem}
                  />
                </View>
                <View
                  style={styles.headerActions}
                >
                  <Button
                    style={styles.headerActionsItemLeft}
                    appearance="outline"
                    onPress={handleSeeAttendees}
                    status="basic"
                    disabled={event.usersCount === 0}
                    accessoryLeft={({ style }) => (
                      <Icon style={style} name="people" />
                    )}
                  >
                    {attendeesCountAsWords(event.usersCount)}
                  </Button>
                  <Button
                    style={styles.headerActionsItemRight}
                    accessoryLeft={({ style }) => (
                      <Icon style={style} name="plus" />
                    )}
                  >
                    Join event
                  </Button>
                </View>
              </View>
              <View
                style={[ styles.eventItems, { backgroundColor: theme['background-basic-color-2'] }]}
              >
                <EventProfileItemDescription
                  event={event}
                  style={styles.profileItem}
                />
              </View>
            </>
          ) : (
            <EventLoader />
          )
        }
      </Animated.ScrollView>
    </>
  );
}


const styles = StyleSheet.create({
  headerRoot: {
    paddingHorizontal: 20,
    paddingBottom: 6,
  },
  topNavigationTitle: {
    alignItems: 'center'
  },
  description: {
    marginHorizontal: 20
  },
  headerAnimatedItems: {
    position: 'absolute'
  },
  headerAboutSummary: {
  },
  headerAboutSummaryItem: {
    marginRight: 8,
  },
  headerActions: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 24,
  },
  headerActionsItemRight: {
    flex: 1,
    marginLeft: 4,
  },
  headerActionsItemLeft: {
    flex: 1,
    marginRight: 4,
  },
  eventItems: {
    minHeight: '100%',
    paddingTop: 20,
  },
  eventItem: {
    marginBottom: 20,
  },
  scrollViewContentContainerStyle: {
    flexGrow: 1
  },
  profileItem: {
    marginBottom: 20,
  },
})

export default React.memo(Event);
