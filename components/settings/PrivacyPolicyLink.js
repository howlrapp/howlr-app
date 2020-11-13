import React from 'react';

import MenuItemLink from '../MenuItemLink';

const PrivacyPolicyLink = (props) => {
  return (
    <MenuItemLink
      title="Privacy policy"
      screen="PrivacyPolicy"
      {...props}
    />
  );
}

export default React.memo(PrivacyPolicyLink);
