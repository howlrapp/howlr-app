import React from 'react';

import MenuItemLink from '../MenuItemLink';

const TermsAndConditionsLink = () => {
  return (
    <MenuItemLink
      title="Terms of use"
      screen="TermsAndConditions"
    />
  );
}

export default React.memo(TermsAndConditionsLink);
