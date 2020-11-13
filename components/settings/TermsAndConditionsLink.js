import React from 'react';

import MenuItemLink from '../MenuItemLink';

const TermsAndConditionsLink = (props) => {
  return (
    <MenuItemLink
      title="Terms of use"
      screen="TermsAndConditions"
      {...props}
    />
  );
}

export default React.memo(TermsAndConditionsLink);
