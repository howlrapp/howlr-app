import React from 'react';
import { MenuItem, Text } from '@ui-kitten/components';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';

const SourceCodeLink = () => {
  const handleOpen = () => {
    WebBrowser.openBrowserAsync(Constants.manifest.extra.sourceCodeUrl);
  }

  return (
    <MenuItem
      title={(props) => (
        <Text {...props}>
          Source code
        </Text>
      )}
      onPress={handleOpen}
    />
  );
}

export default React.memo(SourceCodeLink);
