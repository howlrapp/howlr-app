import React from 'react';
import { Text } from '@ui-kitten/components';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';

import MenuItemLink from '../MenuItemLink';

const SourceCodeLink = () => {
  const handleOpen = () => {
    WebBrowser.openBrowserAsync(Constants.manifest.extra.sourceCodeUrl);
  }

  return (
    <MenuItemLink
      title={"Source code"}
      onPress={handleOpen}
    />
  );
}

export default React.memo(SourceCodeLink);
