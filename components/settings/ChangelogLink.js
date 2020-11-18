import React from 'react';

import MenuItemLink from '../MenuItemLink';

const ChangelogLink = (props) => {
  return (
    <MenuItemLink
      title="Changelog"
      screen="Changelog"
      {...props}
    />
  );
}

export default React.memo(ChangelogLink);
