import React from 'react';
import { useTheme, Divider, Text } from '@ui-kitten/components';

import { View, StyleSheet } from 'react-native';
import EventAttendeesList from './EventAttendeesList';

const EventProfileItemAttendees = ({ event, ...props }) => {
  const theme = useTheme();

  return (
    <View
      {...props}
    >
      <Divider />
      <View
        style={[ styles.content, { backgroundColor: theme['background-basic-color-1'] } ]}
      >
        <Text
          appearance="hint"
          category="label"
          style={styles.label}
        >
          {"VISIBLE USERS GOING TO THIS EVENT"}
        </Text>
        <EventAttendeesList event={event} skip={false} />
      </View>
      <Divider />
    </View>

  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 16,
    paddingBottom: 2,
    paddingHorizontal: 20,
  },
  label: {
    marginBottom: 4,
    textTransform: 'uppercase'
  },
});

export default React.memo(EventProfileItemAttendees);
