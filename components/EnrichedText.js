import React, { useCallback } from 'react';
import ParsedText from 'react-native-parsed-text';
import { StyleSheet } from 'react-native';

import * as WebBrowser from 'expo-web-browser';

import { trim } from 'lodash';

const EnrichedText = ({ body }) => {
  const handleUrlPress = useCallback((url) => {
    WebBrowser.openBrowserAsync(url);
  }, []);

  const handleNamePress = useCallback((name) => {
    WebBrowser.openBrowserAsync(`https://t.me/${name.replace('@', '')}`);
  }, []);

  return (
    <ParsedText
      parse={[
        { type: 'url', style: styles.url, onPress: handleUrlPress },
        { pattern: /@[a-z0-9_]{5,32}/i, style: styles.username, onPress: handleNamePress },

      ]}
    >
      {trim(body)}
    </ParsedText>
  );
}

const styles = StyleSheet.create({
  url: {
    textDecorationLine: 'underline',
  },
  username: {
    fontWeight: 'bold'
  },
})

export default React.memo(EnrichedText);
