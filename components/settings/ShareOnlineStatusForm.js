import React from 'react';

import MenuItemViewerFormSingleChoice from '../MenuItemViewerFormSingleChoice';

const OPTIONS = [
  { value: true,   label: "Yes" },
  { value: false,  label: "No"  },
];

const ShareOnlineStatusForm = (props) => {
  return (
    <MenuItemViewerFormSingleChoice
      title="Share online status"
      description="Enable this setting if you want other users to see when you are online."
      options={OPTIONS}
      attribute="shareOnlineStatus"
      {...props}
    />
  );
}

export default React.memo(ShareOnlineStatusForm);
