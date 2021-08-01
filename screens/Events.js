import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { useLazyQuery } from '@apollo/client';

import { GET_EVENTS } from '../hooks/useGetEvents';

import ResponsiveList from '../components/ResponsiveList';
import EventItem from '../components/events/EventItem';
import EventForm from '../components/events/EventForm';
import MenuSeparator from '../components/MenuSeparator';
import EmptyListEvents from '../components/EmptyListEvents';

const Events = ({ events, callToAction }) => {
  const [ eventFormOpen, setEventFormOpen ] = useState(false);

  const handleOpenEventForm = useCallback(() => (
    setEventFormOpen(true)
  ), []);

  const handleCloseEventForm = useCallback(() => (
    setEventFormOpen(false)
  ), []);

  const ListHeaderComponent = useCallback(() => (
    (callToAction && events.length > 0) ? (
      <View
        style={styles.callToAction}
      >
        <Text
          category="p2"
          appearance='hint'
          style={styles.callToActionText}
        >
          Meet with other members of your local community
        </Text>
        <Button
          size="small"
          onPress={handleOpenEventForm}
        >
          Add your own event
        </Button>
      </View>
    ) : (
      events.length > 0 ? <MenuSeparator /> : null
    )
  ), [callToAction, events]);

  const renderItem = useCallback(({ item }) => (
    <EventItem event={item} />
  ), []);

  const keyExtractor = useCallback(({ id }) => id);

  const ListEmptyComponent = useCallback(() => (
    <EmptyListEvents
      description="Organizing an event is one of the best way to meet with your local community."
    />
  ), []);

  const [ refreshEvents, { loading } ] = useLazyQuery(GET_EVENTS, { fetchPolicy: "network-only" });
  const handleRefresh = useCallback(() => {
    refreshEvents();
  }, [refreshEvents]);

  return (
    <>
      <ResponsiveList
        initialNumToRender={5}
        data={events}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={MenuSeparator}
        ItemSeparatorComponent={MenuSeparator}
        ListEmptyComponent={ListEmptyComponent}
        refreshing={loading}
        onRefresh={handleRefresh}
      />
      <EventForm
        title="Add event"
        open={eventFormOpen}
        onCancel={handleCloseEventForm}
        onSave={handleCloseEventForm}
      />
    </>
  );
}

const styles = StyleSheet.create({
  callToAction: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  callToActionText: {
    paddingBottom: 15
  }
})

export default React.memo(Events);
