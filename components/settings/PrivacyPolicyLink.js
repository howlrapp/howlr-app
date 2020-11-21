import React from 'react';

import MenuItemLink from '../MenuItemLink';

const PrivacyPolicyLink = () => {
  return (
    <MenuItemLink
      title="Privacy policy"
      screen="PrivacyPolicy"
    />
  );
}

export default React.memo(PrivacyPolicyLink);
