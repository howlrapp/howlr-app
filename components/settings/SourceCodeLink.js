import React, { useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';

import useApp from '../../hooks/useApp';

import MenuItemLink from '../MenuItemLink';

const SourceCodeLink = () => {
  const { githubLink } = useApp();

  const handleOpen = useCallback(() => {
    WebBrowser.openBrowserAsync(githubLink);
  }, [githubLink]);

  return (
    <MenuItemLink
      title={"Source code"}
      onPress={handleOpen}
    />
  );
}

export default React.memo(SourceCodeLink);
