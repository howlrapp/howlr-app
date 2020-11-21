import React from 'react';

import MenuItemLink from '../MenuItemLink';

const FaqLink = () => {
  return (
    <MenuItemLink
      title="FAQ"
      screen="Faq"
    />
  );
}

export default React.memo(FaqLink);
