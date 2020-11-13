import React, { useMemo } from 'react';
import {
  Divider,
  Text,
  Icon,
  useTheme
} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { format } from 'date-fns'
import EventActionsMenu from './EventActionsMenu';

import useApp from '../../hooks/useApp';
import useRandomColor from '../../hooks/useRandomColor';

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

const EventItem = ({ event }) => {
  const theme = useTheme();

  const { eventCategories } = useApp();

  const eventCategory = useMemo(() => (
    eventCategories.find(({ id }) => id === event.eventCategoryId)
  ), [event, eventCategories]);

  const backgroundColor = useRandomColor(event.eventCategoryId);

  const privacyStatusInWords = (privacyStatus) => {
    switch(privacyStatus) {
      case "open":
        return "Open to everyone"
      case "liked_only":
        return "Liked only"
      default:
        return privacyStatus.replace('_', ' ')
    }
  }

  return (
    <>
      <View
        style={styles.information}
      >
        <Text category="c2" style={{ color: backgroundColor }}>
          {eventCategory.label.toUpperCase()}
        </Text>
        <Text category="c1" style={{ color: backgroundColor }}>
          {privacyStatusInWords(event.privacyStatus).toUpperCase()}
        </Text>
      </View>
      <Divider style={[ { backgroundColor: backgroundColor }, styles.categoryDivider ]} />

      <View
        style={[ styles.category ]}
      >
        <View
          style={[ styles.categoryTextContainer ]}
        >
          <View
            style={styles.headerBody}
          >
            <Text category="s2">
              {event.title}
            </Text>

            <View
              style={styles.addressContainer}
            >
              <Icon
                name='pin-outline'
                width={12}
                height={12}
                fill={theme['text-hint-color']}
              />
              <Text category="c1" numberOfLines={1} style={styles.addressText}>
                {event.address}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[ styles.categoryRightContainer ]}
        >
          <EventItemDate event={event} />
          <EventActionsMenu event={event} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  category: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingRight: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  categoryTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDivider: {
    height: 2,
    marginHorizontal: 10
  },
  information: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerBody: {
    flexDirection: 'column'
  },
  date: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateDay: {
    fontSize: 20
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    marginLeft: 3,
  },
})

export default EventItem;
