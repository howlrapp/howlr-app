import React from 'react';

import MenuItemLink from '../MenuItemLink';

const ChangelogLink = () => {
  return (
    <MenuItemLink
      title="Changelog"
      screen="Changelog"
    />
  );
}

export default React.memo(ChangelogLink);
