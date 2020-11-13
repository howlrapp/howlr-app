import React, { useCallback } from 'react';
import {
  Text,
  ListItem
} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { trim } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import ParsedText from 'react-native-parsed-text';
import * as WebBrowser from 'expo-web-browser';

import UserAvatar from '../UserAvatar';
import EventActionsMenu from './EventActionsMenu';

const EventItemBody = ({ event, numberOfLines, withActions }) => {
  const renderAccessoryLeft = useCallback(({ style: { height } }) => (
    <UserAvatar user={event.user} size={height} />
  ), [event.user]);

  const renderAccessoryRight = useCallback(() => (
    <EventActionsMenu event={event} />
  ), [event]);

  const navigation = useNavigation();
  const handleGoToUser = useCallback(() => (
    navigation.navigate('User', { id: event.user.id })
  ), [event.user.id]);

  const handleUrlPress = useCallback((url) => {
    WebBrowser.openBrowserAsync(url);
  }, []);

  const handleNamePress = useCallback((name) => {
    WebBrowser.openBrowserAsync(`https://t.me/${name.replace('@', '')}`);
  }, []);

  return (
    <View
      style={styles.body}
    >
      <ListItem
        accessoryLeft={renderAccessoryLeft}
        accessoryRight={withActions && renderAccessoryRight}
        title={event.user.name}
        style={styles.listItem}
        onPress={handleGoToUser}
      />
      <Text
        category="p2"
        style={styles.description}
        numberOfLines={numberOfLines}
      >
       <ParsedText
          parse={[
            { type: 'url', style: styles.url, onPress: handleUrlPress },
            { pattern: /@[a-z0-9_]{5,32}/i, style: styles.username, onPress: handleNamePress },

          ]}
        >
          {trim(event.description) || "No description"}
        </ParsedText>

      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingVertical: 5,
    paddingBottom: 20,
  },
  listItem: {
    paddingRight: 0,
    backgroundColor: "transparent"
  },
  description: {
    paddingHorizontal: 10,
  },
  url: {
    textDecorationLine: 'underline',
  },
  username: {
    fontWeight: 'bold'
  },
})

export default React.memo(EventItemBody);
