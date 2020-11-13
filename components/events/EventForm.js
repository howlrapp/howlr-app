import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Input, Text, Select, SelectItem, Toggle, Datepicker, IndexPath } from '@ui-kitten/components';
import { StyleSheet, View, Alert } from 'react-native';
import { isEmpty, orderBy } from 'lodash';

import useViewer from '../../hooks/useViewer';
import useApp from '../../hooks/useApp';
import useDistance from '../../hooks/useDistance';
import useRandomColor from '../../hooks/useRandomColor';
import useInsertEvent from '../../hooks/useInsertEvent';
import { GET_EVENTS } from '../../hooks/useGetEvents';
import { GET_VIEWER } from '../../hooks/useGetViewer';

import FormModal from '../FormModal';
import MenuSeparator from '../MenuSeparator';

const EventCategoryCircle = React.memo(({ eventCategory, style }) => {
  const backgroundColor = useRandomColor(eventCategory.id);

  return (
    <View
      style={[ style, styles.eventCategoryCircle, { backgroundColor } ]}
    />
  );
})

const EventForm = ({
  event,
  onSave,
  onCancel,
  open,
  ...props
}) => {
  const { localities, latitude, longitude, canCreateEvent } = useViewer();
  const { eventCategories, eventsMaximumSearchableDistance, eventsMaxPerWeek } = useApp();
  const sortedEventCategories = useMemo(() => (
    orderBy(eventCategories, 'label')
  ), [eventCategories]);

  const maximumEventsReached = !event?.id && !canCreateEvent;
  // check if user can create event
  useEffect(() => {
    if (open && maximumEventsReached) {
      Alert.alert(
        `Unavailable`,
        `You can only create up to ${eventsMaxPerWeek} events each week.`,
        [
          {
            text: 'OK',
            onPress: () => {
              if (onCancel) {
                onCancel();
              }
            }
          }
        ]
      );
    }
  }, [open]);

  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ date, setDate ] = useState(null);
  const [ privacyStatus, setPrivacyStatus ] = useState("open");
  const [ eventLocalities, setEventLocalities ] = useState(localities)
  const [ categoryIndex, setCategoryIndex ] = useState(new IndexPath(0));

  // make it configurable at some point
  const [ maximumSearchableDistance ] = useState(eventsMaximumSearchableDistance)

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setAddress(event.address);
      setDate(new Date(event.date));
      setPrivacyStatus(event.privacyStatus);
      setEventLocalities(event.localities);
      setCategoryIndex(
        new IndexPath(sortedEventCategories.findIndex(({ id }) => id === event.eventCategoryId) || 0)
      );
    } else {
      setTitle("");
      setDescription("");
      setAddress("");
      setDate(null);
      setPrivacyStatus("open");
      setEventLocalities(localities);
      setCategoryIndex(new IndexPath(0));
    }
  }, [event, open]);

  const [ insertEvent, { loading } ] = useInsertEvent();

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  const handleAddEvent = async () => {
    await insertEvent({
      variables: {
        input: {
          id: event?.id,
          eventCategoryId: sortedEventCategories[categoryIndex.row].id,
          title,
          address,
          description,
          latitude,
          longitude,
          maximumSearchableDistance,
          date,
          privacyStatus
        }
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: GET_EVENTS },
        { query: GET_VIEWER }
      ],
    });

    if (onSave) {
      onSave();
    }
  };

  const handleToggleLikdeOnly = useCallback((checked) => {
    if (checked) {
      setPrivacyStatus("liked_only");
    } else {
      setPrivacyStatus("open");
    }
  }, []);

  const distanceSentence = useDistance(maximumSearchableDistance / 1000)

  const invalid = useMemo(() => (
    maximumEventsReached || !date || isEmpty(title) || isEmpty(address) || isEmpty(privacyStatus)
  ), [
    date,
    title,
    address,
    privacyStatus
  ]);

  const minDate = useMemo(() => new Date(), []);
  const disabled = loading || maximumEventsReached;

  return (
    <FormModal
      loading={loading}
      invalid={invalid}
      onSave={handleAddEvent}
      onCancel={handleCancel}
      open={open}
      {...props}
    >
      <Select
        selectedIndex={categoryIndex}
        onSelect={index => setCategoryIndex(index)}
        value={(props) => (
          <Text
            {...props}
          >
            {sortedEventCategories[categoryIndex.row].label}
          </Text>
        )}
        disabled={disabled}
      >
        {
          sortedEventCategories.map((eventCategory) => (
            <SelectItem
              key={eventCategory.id}
              title={eventCategory.label}
              accessoryRight={(props) => <EventCategoryCircle {...props} eventCategory={eventCategory} />}
            />
          ))
        }
      </Select>

      <MenuSeparator />

      <Datepicker
        date={date}
        onSelect={setDate}
        placeholder="Date"
        disabled={disabled}
        min={minDate}
      />

      <MenuSeparator />

      <Input
        defaultValue={title}
        placeholder="Title"
        onChangeText={setTitle}
        disabled={disabled}
      />

      <MenuSeparator size="tiny" />

      <Input
        defaultValue={address}
        placeholder="Location"
        onChangeText={setAddress}
        disabled={disabled}
      />

      <MenuSeparator size="tiny" />

      <Input
        defaultValue={description}
        placeholder="Description and useful information"
        multiline
        numberOfLines={3}
        minHeight={120}
        maxHeight={120}
        textAlignVertical={'top'}
        onChangeText={setDescription}
        disabled={disabled}
      />

      <MenuSeparator size="large" />

      <Toggle
        checked={privacyStatus === 'liked_only'}
        onChange={handleToggleLikdeOnly}
        disabled={disabled}
      >
        {"Restrict this event to people you Liked"}
      </Toggle>

      <MenuSeparator size="large" />

      <View
        style={styles.locationInformation}
      >
        <Text category="p2" style={styles.locationInformationText}>
          {`Your event will be visible to all users in an area of `}
          <Text category="s2">
            {distanceSentence}
          </Text>
          {` around `}
          <Text category="s2">
            {`${[ eventLocalities[0], eventLocalities[1] ].join(', ')}`}
          </Text>
          {`.\n\n`}
          {`As the organizer of this event you are responsible for the safety of yourself and your guests.`}
        </Text>
      </View>
    </FormModal>
  );
};

const styles = StyleSheet.create({
  locationInformation: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  locationInformationText: {
    textAlign: 'center'
  },
  eventCategoryCircle: {
    borderRadius: 64,
  }
})

export default EventForm;