import React, { useCallback } from 'react';
import { Text } from '@ui-kitten/components';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';

import useApp from '../../hooks/useApp';

import MenuItemLink from '../MenuItemLink';

const WebsiteLink = () => {
  const { websiteLink } = useApp();

  const handleOpen = useCallback(() => {
    WebBrowser.openBrowserAsync(websiteLink);
  }, [websiteLink])

  return (
    <MenuItemLink
      title={"Website"}
      onPress={handleOpen}
    />
  );
}

export default React.memo(WebsiteLink);
