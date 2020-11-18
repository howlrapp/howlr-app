import React from 'react';
import { Text } from '@ui-kitten/components';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';

import MenuItemLink from '../MenuItemLink';

const WebsiteLink = () => {
  const handleOpen = () => {
    WebBrowser.openBrowserAsync(Constants.manifest.extra.websiteUrl);
  }

  return (
    <MenuItemLink
      title={"About us"}
      onPress={handleOpen}
    />
  );
}

export default React.memo(WebsiteLink);
