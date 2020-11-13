import React from 'react';
import { MenuItem, Text } from '@ui-kitten/components';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';

const WebsiteLink = () => {
  const handleOpen = () => {
    WebBrowser.openBrowserAsync(Constants.manifest.extra.websiteUrl);
  }

  return (
    <MenuItem
      title={(props) => (
        <Text {...props}>
          About us
        </Text>
      )}
      onPress={handleOpen}
    />
  );
}

export default React.memo(WebsiteLink);
