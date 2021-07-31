import React, { useMemo } from 'react';
import {
  Divider,
  Text,
  useTheme
} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import EventActionsMenu from './EventActionsMenu';
import EventItemDate from './EventItemDate';

import useApp from '../../hooks/useApp';
import useRandomColor from '../../hooks/useRandomColor';

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
              <Text category="c1" style={styles.addressText}>
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
    flexWrap: 'wrap',
    flex: 1
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
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
  },
})

export default EventItem;
