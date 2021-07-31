import React from 'react';
import {
  Text,
} from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns'

const EventItemDate = ({ event }) => {
  return (
    <View style={styles.date}>
      <Text category="c2" numberOfLines={1}>
        {`${format(new Date(event.date), " MMM")}`.toUpperCase()}
      </Text>
      <Text category="c2" numberOfLines={1} style={styles.dateDay}>
        {`${format(new Date(event.date), " dd")}`.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateDay: {
    fontSize: 20
  },
})

export default EventItemDate;
