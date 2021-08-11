import React from 'react';

import MenuItemLink from '../MenuItemLink';

const SessionsLink = () => {
  return (
    <MenuItemLink
      title="Sessions"
      screen="Sessions"
    />
  );
}

export default React.memo(SessionsLink);
